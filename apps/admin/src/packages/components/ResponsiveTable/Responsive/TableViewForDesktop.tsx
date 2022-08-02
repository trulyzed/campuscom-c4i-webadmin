import React from "react"
import Table, { TableProps } from "antd/lib/table"
import { Col, Row, SpinProps } from "antd"
import { IDataTableProps } from "~/packages/components/ResponsiveTable"
// import { processTableMetaWithUserMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { DownloadButton } from "~/packages/components/ResponsiveTable/DownloadButton"
// import { TableSettings } from "~/packages/components/ResponsiveTable/TableSettings/TableSettings"
import { Pagination } from "~/packages/components/ResponsiveTable/Pagination"
import { DropdownActions } from "~/packages/components/Actions/DropdownActions"

export function TableViewForDesktop(
  props: IDataTableProps & {
    tableTitle?: string
    loading?: boolean | SpinProps
    paginationChange: (page: number, pageSize?: number) => void
    conditionalProps: TableProps<{ [key: string]: string }>
    setConditionalProps: (props: TableProps<{ [key: string]: string } & { currentPagination?: number }>) => void
    downloading: boolean
    setDownloading: (flag: boolean) => void
    paginatedData: any[]
    currentPageSize: number
  }
) {
  return (
    <Row style={{ backgroundColor: "#ffffff", ...props.style }}>
      {props.tableTitle ?
        <Col md={24} className={"ml-10 mt-20"}>
          <h2>{props.tableTitle}</h2>
        </Col>
        : null}
      {props.conditionalProps && props.conditionalProps.dataSource && !props.hidePagination && (
        <Col>
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
            <Col flex="none">
              {props.actions[0]}
            </Col>
            : null}
          {props.searchFunc &&
            props.searchParams &&
            !props.isModal &&
            props.conditionalProps &&
            props.conditionalProps.dataSource &&
            props.conditionalProps.dataSource.length > 0 &&
            !props.hideDownload && (
              <>
                <Col flex="none">
                  <DownloadButton
                    searchFunc={props.searchFunc}
                    searchParams={props.searchParams}
                    downloading={props.downloading}
                    setDownloading={props.setDownloading}
                    fileType={"CSV"}
                  />
                </Col>
                <Col flex="none">
                  <DownloadButton
                    searchFunc={props.searchFunc}
                    searchParams={props.searchParams}
                    downloading={props.downloading}
                    setDownloading={props.setDownloading}
                    fileType={"EXCEL"}
                  />
                </Col>
              </>
            )}
          {/* {props.tableName && !props.hideSettings && (
            <Col flex="none">
              <TableSettings
                tableName={props.tableName}
                allColumns={props.columns}
                activeColumns={
                  props.conditionalProps.columns
                    ? props.conditionalProps.columns.sort((x: any, y: any) =>
                      sortByNumber(y.columnPosition, x.columnPosition)
                    )
                    : []
                }
                reload={() => {
                  processTableMetaWithUserMetaConfig(props.columns, props.tableName).then((response) => {
                    props.setConditionalProps({
                      ...props.conditionalProps,
                      columns: response
                    })
                  })
                }}
              />
            </Col>
          )} */}
          <DropdownActions title="More" actions={[
            {
              title: <><span className="glyphicon glyphicon-setting mr-5" />Table Settings</>,
              key: 'setting',
            }
          ]} />
        </Row>
      </Col>
      <Col span={24}>
        <Table
          {...props.conditionalProps}
          dataSource={props.paginatedData}
          pagination={false}
          loading={props.loading}
          rowKey={props.rowKey || ((record: any) => record.rowKey)}
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
