import React from "react"
import Table, { TableProps } from "antd/lib/table"
import { Col, Row, SpinProps } from "antd"
import { IDataTableProps, sortByNumber } from "~/packages/components/ResponsiveTable"
import { processTableMetaWithUserMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { DownloadButton } from "~/packages/components/ResponsiveTable/DownloadButton"
import { TableSettings } from "~/packages/components/ResponsiveTable/TableSettings/TableSettings"
import { Pagination } from "~/packages/components/ResponsiveTable/Pagination"

const DEFAULT_PAGE_SIZE = 20
export function TableViewForDesktop(
  props: IDataTableProps & {
    loading?: boolean | SpinProps
    paginationChange: (page: number, pageSize?: number) => void
    conditionalProps: TableProps<{ [key: string]: string }>
    setConditionalProps: (props: TableProps<{ [key: string]: string }>) => void
    downloading: boolean
    setDownloading: (flag: boolean) => void
    paginatedData: any[]
  }
) {
  return (
    <Row style={{ backgroundColor: "#fafafa", ...props.style }}>
      {props.conditionalProps && props.conditionalProps.dataSource && !props.hidePagination && (
        <Col
          flex={"auto"}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            marginLeft: "5px"
          }}
        >
          {!props.loading && props.conditionalProps.dataSource.length ? (
            <Pagination
              current={props.currentPagination || 0}
              onChange={props.paginationChange}
              defaultPageSize={DEFAULT_PAGE_SIZE}
              total={props.conditionalProps.dataSource.length}
            />
          ) : null}
        </Col>
      )}
      <Col flex={"auto"}>
        <Row
          gutter={4}
          justify="end"
          style={{
            marginTop: "10px",
            marginRight: "10px",
            marginBottom: "10px"
          }}
        >
          <Col flex="auto"></Col>
          {props.actions &&
            props.actions?.length > 0 &&
            props.actions.map((action, i) => (
              <Col key={i} flex="none">
                {action}
              </Col>
            ))}
          {props.searchFunc &&
            props.searchParams &&
            !props.isModal &&
            props.conditionalProps &&
            props.conditionalProps.dataSource &&
            props.conditionalProps.dataSource.length > 0 &&
            !props.hideDownload && (
              <Col flex="none">
                <DownloadButton
                  searchFunc={props.searchFunc}
                  searchParams={props.searchParams}
                  downloading={props.downloading}
                  setDownloading={props.setDownloading}
                />
              </Col>
            )}
          {props.tableName && !props.hideSettings && (
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
          )}
        </Row>
      </Col>
      <Col span={24}>
        <Table
          {...props.conditionalProps}
          dataSource={props.paginatedData}
          bordered={true}
          pagination={false}
          loading={props.loading}
          rowKey={props.rowKey || ((record: any) => record.rowKey)}
        />
      </Col>
    </Row>
  )
}
