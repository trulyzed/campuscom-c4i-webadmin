import React, { useState } from "react"
import { Col, Row } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { IField } from "~/packages/components/Form/common"
import { SimpleBarChart } from "~/packages/components/Charts/SimpleBarChart"
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { IChartConfig } from "~/packages/components/Charts/IChartConfig"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"

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
