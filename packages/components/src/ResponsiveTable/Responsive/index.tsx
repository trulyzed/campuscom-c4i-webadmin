import React, { useEffect, useState } from "react"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { TableViewForDesktop } from "~/ResponsiveTable/Responsive/TableViewForDesktop"
import { IDataTableProps, TableColumnType, sortByNumber } from "~/ResponsiveTable"
import { ListViewforMobile } from "./ListViewforMobile"
import { TableProps } from "antd/lib/table"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { processTableMetaWithUserMetaConfig } from "~/ResponsiveTable/TableMetaShadowingProcessor"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { getAndScrollToPosition } from "~/ResponsiveTable/ManageScroll"
import { TableSettings } from "~/ResponsiveTable/TableSettings/TableSettings"

export const DEFAULT_PAGE_SIZE = 20
export const ResponsiveTable = (props: IDataTableProps & {
  tableTitle?: string
  onPaginationChange?: (pagination: { currentPage: number, total: number, currentPageSize: number }) => void
}) => {
  const [desktopView, setDesktopView] = useState(true)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktopView(deviceViews.desktop)
  })

  const [loading, setLoading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [currentPagination, setCurrentPagination] = useState<number>(1)
  const firstRender = useFirstRender()
  const [currentPageSize, setCurrentPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const { currentPagination: propCurrentPagination, onPaginationChange: propOnPaginationChange } = props
  const [showTableSettings, setShowTableSettings] = useState(false)

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
        props.searchFunc({ params: props.searchParams || refreshParams }).then((x) => {
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
  }, [props.searchParams])

  const [conditionalProps, setConditionalProps] = useState<TableProps<{ [key: string]: string }> & { currentPagination?: number }>({})
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
      const page = props.currentPagination === undefined ? currentPagination : props.currentPagination
      !props.hidePagination && setPaginatedData(_conditionalProps.dataSource.slice(
        page === 1 ? 0 : page * currentPageSize - currentPageSize,
        page * currentPageSize
      ))
      props.hidePagination && setPaginatedData(_conditionalProps.dataSource)
    }

    _conditionalProps.scroll = props.scroll || { x: "max-content" }
    _conditionalProps.rowSelection = props.rowSelection
    // _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    setConditionalProps(_conditionalProps)
  }

  const paginationChange = (page: number, pageSize = currentPageSize) => {
    if (props.setCurrentPagination) props.setCurrentPagination(page)
    else setCurrentPagination(page)
    setCurrentPageSize(pageSize)

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

  useEffect(() => {
    propOnPaginationChange?.({
      currentPage: propCurrentPagination || currentPagination,
      total: conditionalProps.dataSource?.length || 0,
      currentPageSize
    })
  }, [conditionalProps.dataSource, propOnPaginationChange, propCurrentPagination, currentPagination, currentPageSize])

  return (
    <>
      {desktopView || conditionalProps.rowSelection ? (
        <TableViewForDesktop
          {...props}
          tableTitle={props.tableTitle}
          loading={props.loading || loading}
          currentPagination={props.currentPagination || currentPagination}
          conditionalProps={conditionalProps}
          setConditionalProps={setConditionalProps}
          paginatedData={paginatedData}
          paginationChange={paginationChange}
          currentPageSize={currentPageSize}
          showTableSettings={() => setShowTableSettings(true)}
        />
      ) : (
        <ListViewforMobile
          {...props}
          loading={props.loading || loading}
          currentPagination={props.currentPagination || currentPagination}
          conditionalProps={conditionalProps}
          setConditionalProps={setConditionalProps}
          paginatedData={paginatedData}
          paginationChange={paginationChange}
          currentPageSize={currentPageSize}
          showTableSettings={() => setShowTableSettings(true)}
        />
      )}
      {props.tableName && !props.hideSettings && (
        <TableSettings
          show={showTableSettings}
          onToggle={setShowTableSettings}
          tableName={props.tableName}
          allColumns={props.columns}
          activeColumns={
            conditionalProps.columns
              ? conditionalProps.columns.sort((x: any, y: any) =>
                sortByNumber(y.columnPosition, x.columnPosition)
              )
              : []
          }
          reload={() => {
            processTableMetaWithUserMetaConfig(props.columns, props.tableName).then((response) => {
              setConditionalProps({
                ...conditionalProps,
                columns: response
              })
            })
          }}
          hideIcon
        />
      )}
    </>
  )
}
