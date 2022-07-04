import React from "react"
import { Card, Col, Empty, Row, Spin, SpinProps } from "antd"
import { TableProps } from "antd/lib/table"
import { IDataTableProps, sortByNumber } from "~/packages/components/ResponsiveTable"
import { TableSettings } from "~/packages/components/ResponsiveTable/TableSettings/TableSettings"
import { DownloadButton } from "~/packages/components/ResponsiveTable/DownloadButton"
import { processTableMetaWithUserMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { Pagination } from "~/packages/components/ResponsiveTable/Pagination"

export const ListViewforMobile = (
  props: IDataTableProps & {
    loading?: boolean | SpinProps
    paginationChange: (page: number, pageSize?: number) => void
    conditionalProps: TableProps<{ [key: string]: string }>
    setConditionalProps: (props: TableProps<{ [key: string]: string }>) => void
    downloading: boolean
    setDownloading: (flag: boolean) => void
    paginatedData: any[]
  }
) => {
  return (
    <>
      {props.loading ? (
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Spin size="large" style={{ textAlign: "center" }} />
        </Row>
      ) : (
        <Row style={{ backgroundColor: "#fafafa", ...props.style }}>
          {props.conditionalProps && props.conditionalProps.dataSource && !props.hidePagination && (
            <Col
              flex={"auto"}
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px"
              }}
            >
              {!props.loading && props.conditionalProps.dataSource.length ? (
                <Pagination
                  current={props.currentPagination || 0}
                  onChange={props.paginationChange}
                  defaultPageSize={20}
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
            <div>
              <ul style={{ padding: "0px", listStyle: "none" }}>
                {props.paginatedData && props.paginatedData.length > 0 ? (
                  props.paginatedData.map((x: { [key: string]: any }, i: number) => {
                    return (
                      <li key={i}>
                        <Card>
                          {props.columns.map((column: { [key: string]: any }, j) => {
                            let toRender
                            if (column.render && column.dataIndex) {
                              toRender = column.render(x[column.dataIndex], x, i)
                            } else if (column.dataIndex) {
                              toRender = x[column.dataIndex]
                            } else if (column.render) {
                              toRender = column.render(x, x)
                            }
                            return (
                              <>
                                {toRender && !column.hidden && (
                                  <div key={j + 1000}>
                                    {column.title && <span>{column.title}: </span>}
                                    <span>{toRender}</span>
                                  </div>
                                )}
                              </>
                            )
                          })}
                        </Card>
                      </li>
                    )
                  })
                ) : (
                  <Empty />
                )}
              </ul>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}
