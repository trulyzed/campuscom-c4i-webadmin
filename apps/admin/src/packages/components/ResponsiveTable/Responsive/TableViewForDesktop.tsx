import React from "react"
import Table, { TableProps } from "antd/lib/table"
import { Col, Row, SpinProps } from "antd"
import { IDataTableProps } from "~/packages/components/ResponsiveTable"
import { DownloadButton } from "~/packages/components/ResponsiveTable/DownloadButton"
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
    showTableSettings: () => void
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
