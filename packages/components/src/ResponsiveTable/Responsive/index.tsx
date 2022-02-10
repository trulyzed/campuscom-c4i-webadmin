import React, { useEffect, useState } from "react"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { TableViewForDesktop } from "~/ResponsiveTable/Responsive/TableViewForDesktop"
import { IDataTableProps, TableColumnType } from "~/ResponsiveTable"
import { ListViewforMobile } from "./ListViewforMobile"
import { TableProps } from "antd/lib/table"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { processTableMetaWithUserMetaConfig } from "~/ResponsiveTable/TableMetaShadowingProcessor"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { getAndScrollToPosition } from "~/ResponsiveTable/ManageScroll"

const DEFAULT_PAGE_SIZE = 20
export const ResponsiveTable = (props: IDataTableProps) => {
  const [desktopView, setDesktopView] = useState(true)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktopView(deviceViews.desktop)
  })

  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [currentPagination, setCurrentPagination] = useState<number>(1)
  const firstRender = useFirstRender()

  const loadDataFromSearchFunc = (refreshParams?: { [key: string]: any }) => {
    processTableMetaWithUserMetaConfig(props.columns, props.tableName).then((columnsConfigByUser: TableColumnType) => {
      if (loading) {
        return
      } else if (props.dataSource) {
        setTableProps(columnsConfigByUser)
      } else if ((props.searchParams || refreshParams) && props.searchFunc) {
        setLoading(true)
        typeof props.searchParams === "object" &&
          Object.keys(props.searchParams).forEach((key) => {
            if (props.searchParams[key] === "") delete props.searchParams[key]
          })
        props.searchFunc(props.searchParams || refreshParams).then((x) => {
          if (x.success) {
            let tableData: Array<any> = []
            if (Array.isArray(x.data)) {
              tableData = x.data.map((y: any, i: number) => {
                if (!props.rowKey) y.rowKey = i
                return y
              })
            }
            setTableProps(columnsConfigByUser, tableData)
            props.dataLoaded && props.dataLoaded(tableData)
          }
          setTimeout(() => {
            setLoading(false)
            getAndScrollToPosition()
          }, 0)
        })
      }
    })
  }
  useEffect(() => {
    if (!firstRender) loadDataFromSearchFunc()
    // eslint-disable-next-line
  }, [props.dataSource, props.searchParams, props.columns])

  useEffect(() => {
    processTableMetaWithUserMetaConfig(props.columns, props.tableName).then(setTableProps)

    const queryParams = querystringToObject()
    if (queryParams["pagination"] && props.setCurrentPagination)
      props.setCurrentPagination(Number(queryParams["pagination"]))

    if (props.searchFunc) {
      const eventName = props.isModal ? REFRESH_MODAl : props.refreshEventName ? props.refreshEventName : REFRESH_PAGE
      eventBus.subscribe(eventName, loadDataFromSearchFunc)
      eventBus.publish(eventName)
      return () => {
        eventBus.unsubscribe(eventName)
      }
    } else {
      loadDataFromSearchFunc()
    }

    // eslint-disable-next-line
  }, [])

  const [conditionalProps, setConditionalProps] = useState<TableProps<{ [key: string]: string }>>({})
  const setTableProps = (columnsConfigByUser: TableColumnType, data: any = []) => {
    const _conditionalProps: TableProps<{ [key: string]: string }> = {
      ...props,
      columns: columnsConfigByUser.map((x) => {
        if (x.title === "" || !x.title || x.title === "Action" || x.title === "Published" || props.disableSorting) {
          return x
        }
        const dataIndex: string = x.dataIndex as string
        x.sorter = (a: any, b: any) => {
          const aa =
            a[dataIndex] === undefined || a[dataIndex] === null || a[dataIndex] === false ? "" : String(a[dataIndex])
          const bb =
            b[dataIndex] === undefined || b[dataIndex] === null || b[dataIndex] === false ? "" : String(b[dataIndex])
          return aa.localeCompare(bb)
        }
        return x
      })
    }

    _conditionalProps.dataSource = props.dataSource ? props.dataSource : data
    if (Array.isArray(_conditionalProps.dataSource)) {
      !props.hidePagination && setPaginatedData(_conditionalProps.dataSource?.filter((x, i) => i < DEFAULT_PAGE_SIZE))
      props.hidePagination && setPaginatedData(_conditionalProps.dataSource)
    }

    _conditionalProps.scroll = { x: props.columns.length }
    _conditionalProps.rowSelection = props.rowSelection
    // _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    setConditionalProps(_conditionalProps)
  }

  const paginationChange = (page: number, pageSize = DEFAULT_PAGE_SIZE) => {
    if (props.setCurrentPagination) props.setCurrentPagination(page)
    else setCurrentPagination(page)

    const quaryParams = { ...querystringToObject(), pagination: page }
    const _queryString = objectToQueryString(Object.keys(quaryParams).length > 0 ? quaryParams : null)
    window.history && window.history.pushState({}, "", _queryString)

    if (conditionalProps && Array.isArray(conditionalProps.dataSource)) {
      const __dataSource = conditionalProps.dataSource.slice(
        page === 1 ? 0 : page * pageSize - pageSize,
        page * pageSize
      )
      setPaginatedData(__dataSource)
    }
  }
  return desktopView || conditionalProps.rowSelection ? (
    <TableViewForDesktop
      {...props}
      title={() => props.title || props.tableName}
      loading={props.loading || loading}
      currentPagination={props.currentPagination || currentPagination}
      conditionalProps={conditionalProps}
      setConditionalProps={setConditionalProps}
      downloading={downloading}
      setDownloading={setDownloading}
      paginatedData={paginatedData}
      paginationChange={paginationChange}
    />
  ) : (
    <ListViewforMobile
      {...props}
      loading={props.loading || loading}
      currentPagination={props.currentPagination || currentPagination}
      conditionalProps={conditionalProps}
      setConditionalProps={setConditionalProps}
      downloading={downloading}
      setDownloading={setDownloading}
      paginatedData={paginatedData}
      paginationChange={paginationChange}
    />
  )
}
