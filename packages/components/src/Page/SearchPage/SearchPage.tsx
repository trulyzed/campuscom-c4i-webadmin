import React, { useEffect, useState } from "react"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { IField } from "~/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/ResponsiveTable"
import { Button, Col, Result, Row } from "antd"
import { HelpButton } from "~/Help/HelpButton"
import { checkInstructorApiPermission } from "@packages/api/lib/Permission/InstructorApiPermission"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"

export interface ISearchListWithVisibleSearchFormProp {
  title: string
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
}

export function SearchPage(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [currentPagination, setCurrentPagination] = useState<number>()

  useEffect(() => {
    if (props.initSearchAtMount) setSearchParams({ ...props.initialFormValue, ...props.defaultFormValue })
    // eslint-disable-next-line
  }, [props.initSearchAtMount])
  return (
    <div className="site-layout-content">
      {props.tableProps.searchFunc && checkInstructorApiPermission(props.tableProps.searchFunc) && (
        <>
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

          {props.meta && (
            <MetaDrivenForm
              title={props.title}
              blocks={props.blocks}
              helpKey={props.helpKey}
              meta={props.meta}
              metaName={props.metaName}
              stopProducingQueryParams={props.stopProducingQueryParams}
              initialFormValue={{ ...props.initialFormValue } || {}}
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
            />
          )}

          <ResponsiveTable
            currentPagination={currentPagination}
            setCurrentPagination={setCurrentPagination}
            {...props.tableProps}
            searchParams={searchParams}
          />
        </>
      )}
      {props.tableProps.searchFunc && !checkInstructorApiPermission(props.tableProps.searchFunc) && (
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
