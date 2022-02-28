import React, { useState } from "react"
import { Col, Row } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { IField } from "~/Form/common"
import { SimpleBarChart } from "~/Charts/SimpleBarChart"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IChartConfig } from "~/Charts/IChartConfig"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"

export interface IStandardReportPage {
  config: IChartConfig
  meta?: IField[]
  metaName?: string
  searchFunc: (Params: { [key: string]: any }, from?: number, to?: number) => Promise<IApiResponse>
  initialFormValue: { [key: string]: string }
}

export function StandardChartPage(props: IStandardReportPage) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()

  return (
    <div className="site-layout-content">
      <Row>
        <SidebarMenuTargetHeading level={1}>{props.config.title}</SidebarMenuTargetHeading>
      </Row>
      <Row justify="start" gutter={[8, 8]}>
        <Col>
          <span>
            <FilterOutlined />
            {/* <span> {filterCount === 0 ? "No" : filterCount} filters applied</span> */}
          </span>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ paddingTop: "10px", margin: "0px" }}>
        {props.meta && (
          <MetaDrivenForm
            meta={props.meta}
            metaName={props.metaName}
            initialFormValue={props.initialFormValue}
            applyButtonLabel="Render Chart"
            clearButtonLabel="Clear Chart"
            onApplyChanges={(newFilterValues) => {
              // setFilterCount(appliedFilterCount)
              setSearchParams(newFilterValues)
            }}
          />
        )}
      </Row>

      {props.config.chartType === "simplebarchart" && (
        <SimpleBarChart searchParams={searchParams} searchFunc={props.searchFunc} config={props.config} />
      )}
    </div>
  )
}
