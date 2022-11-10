import React, { useEffect, useState } from "react"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { IField } from "~/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/ResponsiveTable"
import { Button, Col, Result, Row } from "antd"
import { HelpButton } from "~/Help/HelpButton"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { DEFAULT_PAGE_SIZE } from "~/ResponsiveTable/Responsive"

export interface ISearchListWithVisibleSearchFormProp {
  title?: string
  searchTitle?: string
  blocks?: JSX.Element[]
  meta?: IField[]
  metaName?: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  helpKey?: string
  stopProducingQueryParams?: boolean
  initSearchAtMount?: boolean
  updatedParams?: (params?: any) => void
  hideHeading?: boolean
  onChange?: (args: { data: any; searchParams: any }) => void
  tableFooter?: React.ReactNode
}

export function SearchPage(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [currentPagination, setCurrentPagination] = useState<number>()
  const [pagination, setPagination] = useState<{ currentPage: number, total: number, currentPageSize: number }>({
    currentPage: 1,
    total: 0,
    currentPageSize: DEFAULT_PAGE_SIZE
  })

  useEffect(() => {
    if (props.initSearchAtMount) setSearchParams({ ...props.initialFormValue, ...props.defaultFormValue })
    // eslint-disable-next-line
  }, [props.initSearchAtMount])
  return (
    <div className="site-layout-content">
      {props.tableProps.searchFunc && checkAdminApiPermission(props.tableProps.searchFunc) && (
        <>
          {(!props.hideHeading && props.title) ?
            <Row>
              <Col md={24} xs={24} className={'mt-15'}>
                <Title level={3}>
                  Manage {props.title}
                </Title>
              </Col>
              <Col md={24} xs={24} className={'mb-10'}>
                <Text style={{ textTransform: 'lowercase' }} type="secondary" className="ml-10">{pagination.total} {props.title} displayed</Text>
              </Col>
            </Row>
            : null}
          {!props.meta && (
            <Row
              justify="space-between"
              style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginBottom: "2px",
                padding: "10px"
              }}
            >
              {props.title && (
                <Col flex="none">
                  <SidebarMenuTargetHeading level={1} targetID="navigation">
                    {props.title}
                  </SidebarMenuTargetHeading>
                </Col>
              )}

              <Col flex="none">
                <Row>
                  {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
                  {props.helpKey && <HelpButton helpKey={props.helpKey} />}
                </Row>
              </Col>
            </Row>
          )}
          <Row gutter={25}>
            {props.meta &&
              <Col lg={6} xl={5} xs={24}>
                <MetaDrivenForm
                  title={props.searchTitle || (props.title ? `${props.title} Filter` : undefined)}
                  blocks={props.blocks}
                  helpKey={props.helpKey}
                  meta={props.meta}
                  metaName={props.metaName}
                  stopProducingQueryParams={props.stopProducingQueryParams}
                  autoApplyChangeFromQueryParams
                  initialFormValue={props.initialFormValue}
                  setCurrentPagination={setCurrentPagination}
                  onApplyChanges={(newFilterValues) => {
                    setSearchParams({
                      ...props.defaultFormValue,
                      ...newFilterValues
                    })
                    props.updatedParams &&
                      props.updatedParams({
                        ...props.defaultFormValue,
                        ...newFilterValues
                      })
                    if (newFilterValues["pagination"]) setCurrentPagination(newFilterValues["pagination"])
                    else setCurrentPagination(1)
                  }}
                  isVertical
                  isAside
                  showFullForm
                />
              </Col>
            }
            <Col lg={18} xl={19} xs={24}>
              <ResponsiveTable
                currentPagination={currentPagination}
                setCurrentPagination={setCurrentPagination}
                {...props.tableProps}
                searchParams={searchParams}
                tableTitle={props.title}
                onPaginationChange={setPagination}
                dataLoaded={(data) => props.onChange?.({ data, searchParams })}
              />
              {props.tableFooter}
            </Col>
          </Row>
        </>
      )}
      {props.tableProps.searchFunc && !checkAdminApiPermission(props.tableProps.searchFunc) && (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary">Back Home</Button>}
        />
      )}
    </div>
  )
}
