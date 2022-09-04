import React from "react"
import { Card, Col, Empty, Row, Spin, SpinProps } from "antd"
import { TableProps } from "antd/lib/table"
import { IDataTableProps } from "~/ResponsiveTable"
import { DownloadButton } from "~/ResponsiveTable/DownloadButton"
import { Pagination } from "~/ResponsiveTable/Pagination"
import { DropdownActions } from "~/Actions/DropdownActions"

export const ListViewforMobile = (
  props: IDataTableProps & {
    loading?: boolean | SpinProps
    paginationChange: (page: number, pageSize?: number) => void
    conditionalProps: TableProps<{ [key: string]: string }>
    setConditionalProps: (props: TableProps<{ [key: string]: string }> & { currentPagination?: number }) => void
    paginatedData: any[]
    currentPageSize: number
    showTableSettings: () => void
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
          <Col flex={"auto"}>
            <Row
              gutter={4}
              justify="end"
              style={{
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px"
              }}
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
                              (toRender && !column.hidden) ? (
                                <div key={j + 1000}>
                                  {column.title && <span>{column.title}: </span>}
                                  <span>{toRender}</span>
                                </div>
                              ) : null
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
