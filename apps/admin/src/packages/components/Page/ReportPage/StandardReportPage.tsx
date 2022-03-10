import React, { useState } from "react"
import { Row } from "antd"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { IField } from "~/packages/components/Form/common"
import { getToken } from "~/packages/services/Api/utils/TokenStore"
import { ISimplifiedApiErrorMessage } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"

export interface IStandardReportPage {
  title: string
  reportName: string
  description?: string
  meta?: IField[]
  metaName?: string
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  mapping?: { [key: string]: any }
  atLeastOneRequiredfield?: boolean
}

export function StandardReportPage(props: IStandardReportPage) {
  const [downloadUrl, setdownloadUrl] = useState<string>()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [stopFirstOnApplyChanges, setStopFirstOnApplyChanges] = useState(true)

  const openReportInNewTab = (params: { [key: string]: any }) => {
    setErrorMessages([])

    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === undefined || (typeof params[key] === "string" && params[key].includes("undefined_"))) {
        delete params[key]
      }
    })

    if (props.atLeastOneRequiredfield && Object.keys(params).length === 0) {
      setErrorMessages([{ message: "Minimum one search field is required!" }])
      setdownloadUrl(undefined)
      return
    }

    let urlParams = `/api/reportServlet?ReportName=${props.reportName}&`

    params = { ...params, ...props.defaultFormValue }
    for (const key in params) {
      if (Array.isArray(params[key]) && params[key].length > 0) {
        urlParams += `${key}=[${params[key]}]&`
      } else {
        console.log(params)
        urlParams += `${key}=${params[key]}&`
      }
      if (props.mapping) {
        if (Array.isArray(props.mapping[key]) && props.mapping[key].length > 0) {
          for (const mappingKey of props.mapping[key]) {
            urlParams += `${mappingKey}=${params[key]}&`
          }
        } else if (props.mapping[key]) {
          urlParams += `${props.mapping[key]}=${params[key]}&`
        }
      }
    }
    urlParams += "token=" + getToken()
    console.log(urlParams)
    setdownloadUrl(urlParams)
  }
  return (
    <div className="site-layout-content">
      {props.meta && (
        <MetaDrivenForm
          title={<SidebarMenuTargetHeading level={1}>{props.title}</SidebarMenuTargetHeading>}
          meta={props.meta}
          metaName={props.reportName}
          initialFormValue={props.initialFormValue}
          applyButtonLabel="Run Report"
          errorMessages={errorMessages}
          stopProducingQueryParams={true}
          onApplyChanges={(newFilterValues) => {
            if (stopFirstOnApplyChanges) {
              setStopFirstOnApplyChanges(false)
            } else {
              openReportInNewTab(newFilterValues)
            }
          }}
        />
      )}
      {downloadUrl && (
        <Row>
          <iframe title={props.title} style={{ width: "100%", height: "100vh" }} src={downloadUrl} />
        </Row>
      )}
    </div>
  )
}
