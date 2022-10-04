import React, { useCallback } from "react"
import Table, { TableProps } from "antd/lib/table"
import { Col, Row, SpinProps } from "antd"
import { IDataTableProps } from "~/ResponsiveTable"
import { DownloadButton } from "~/ResponsiveTable/DownloadButton"
import { Pagination } from "~/ResponsiveTable/Pagination"
import { DropdownActions } from "~/Actions/DropdownActions"
import { EmptyState } from "~/Layout/EmptyState"

export function TableViewForDesktop(
  props: IDataTableProps & {
    tableTitle?: string
    loading?: boolean | SpinProps
    paginationChange: (page: number, pageSize?: number) => void
    conditionalProps: TableProps<{ [key: string]: string }>
    setConditionalProps: (props: TableProps<{ [key: string]: string } & { currentPagination?: number }>) => void
    paginatedData: any[]
    currentPageSize: number
    showTableSettings: () => void
  }
) {

  const getTableColumnWithAriaLabel = useCallback((columns: IDataTableProps["columns"]|undefined):IDataTableProps["columns"] => {
    if(columns){
      return (columns || []).map(column=>({ ...column, onHeaderCell: () => ({"aria-label": column.ariaLabel || column.title as string })}))
    }
    return []
    // eslint-disable-next-line
  },[props.conditionalProps.columns])

  return (
    <Row style={{ backgroundColor: "#ffffff", ...props.style }}>
      {props.tableTitle ?
        <Col md={24} className={"ml-10 mt-20"}>
          <h2>{props.tableTitle}</h2>
        </Col>
        : null}
      <Col flex={"auto"}>
        <Row style={{ flexWrap: "wrap-reverse" }}>
          {props.conditionalProps && props.conditionalProps.dataSource && !props.hidePagination && (
            <Col flex={"auto"}>
              {!props.loading && props.conditionalProps.dataSource.length ? (
                <Pagination
                  current={props.currentPagination || 0}
                  onChange={props.paginationChange}
                  defaultPageSize={props.currentPageSize}
                  total={props.conditionalProps.dataSource.length}
                  showSummary
                />
              ) : null}
            </Col>
          )}
          <Col flex={"auto"}>
            <Row
              gutter={0}
              justify="end"
              className="table-actions"
            >
              <Col flex="auto"></Col>
              {props.actions?.length ?
                <Col flex="none" className="create-entity-container">
                  {props.actions[0]}
                </Col>
                : null}
              {props.searchFunc &&
                props.searchParams &&
                !props.isModal &&
                props.conditionalProps &&
                props.conditionalProps.dataSource &&
                props.conditionalProps.dataSource.length > 0 &&
                props.showDownload && (
                  <>
                    <Col flex="none">
                      <DownloadButton
                        searchFunc={props.searchFunc}
                        searchParams={props.searchParams}
                        fileType={"CSV"}
                      />
                    </Col>
                    <Col flex="none">
                      <DownloadButton
                        searchFunc={props.searchFunc}
                        searchParams={props.searchParams}
                        fileType={"EXCEL"}
                      />
                    </Col>
                  </>
                )}
              {props.tableName && !props.hideSettings ?
                <DropdownActions title="More" actions={[
                  {
                    title: <><span className="glyphicon glyphicon-setting mr-5" />Table Settings</>,
                    key: 'setting',
                    onClick: () => props.showTableSettings()
                  }
                ]} />
                : null}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          {...props.conditionalProps}
          dataSource={props.paginatedData}
          columns={getTableColumnWithAriaLabel(props.conditionalProps.columns)}
          pagination={false}
          loading={props.loading}
          rowKey={props.rowKey || ((record: any) => record.rowKey)}
          locale={{ emptyText: <EmptyState /> }}
        />
      </Col>
      {props.conditionalProps && props.conditionalProps.dataSource && !props.hidePagination && (
        <Col>
          {!props.loading && props.conditionalProps.dataSource.length ? (
            <Pagination
              current={props.currentPagination || 0}
              onChange={props.paginationChange}
              defaultPageSize={props.currentPageSize}
              total={props.conditionalProps.dataSource.length}
            />
          ) : null}
        </Col>
      )}
    </Row>
  )
}
