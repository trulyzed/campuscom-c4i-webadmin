import React, { useState } from "react"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { IField } from "~/packages/components/Form/common"
import { Col, Row } from "antd"
import { History } from "history"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { ISimplifiedApiErrorMessage } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"
import { eventBus } from "~/packages/utils/EventBus"
import { useHistory } from "react-router-dom"

export interface ICreatePageProps {
  title: string
  blocks?: JSX.Element[]
  meta?: IField[]
  metaName?: string
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  formSubmitApi: IQuery
  onFormSubmit?: (data?: any, navigator?: History['push']) => void
  helpKey?: string
  isVertical?: boolean
  refreshEventAfterFormSubmission?: string | symbol | symbol[] | string[] | Array<string | symbol>
}

export function CreatePage(props: ICreatePageProps) {
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const [loading, setLoading] = useState(!!props.initialFormValue)
  const history = useHistory();

  const submit = (newValues: { [key: string]: any }) => {
    setError([])
    setLoading(true)
    props.formSubmitApi({ data: newValues }).then((x) => {
      if (x.success) {
        if (props.refreshEventAfterFormSubmission && typeof props.refreshEventAfterFormSubmission === "string")
          eventBus.publish(props.refreshEventAfterFormSubmission)
        else if (props.refreshEventAfterFormSubmission && Array.isArray(props.refreshEventAfterFormSubmission))
          for (let i = 0; i < props.refreshEventAfterFormSubmission.length; i++) {
            eventBus.publish(props.refreshEventAfterFormSubmission[i])
          }
        setLoading(false)
        props.onFormSubmit?.(x.data, history.push)
      } else {
        setError(x.error)
        setLoading(false)
      }
    })
  }

  return (
    <div className="site-layout-content">
      {props.formSubmitApi && checkAdminApiPermission(props.formSubmitApi) && (
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
              meta={props.meta}
              metaName={props.metaName}
              title={props.title}
              helpKey={props.helpKey}
              loading={loading}
              isVertical={props.isVertical}
              initialFormValue={props.initialFormValue}
              defaultFormValue={props.defaultFormValue}
              applyButtonLabel="Submit"
              stopProducingQueryParams={true}
              errorMessages={error}
              onApplyChanges={submit}
              showFullForm
            />
          )}
        </>
      )}
    </div>
  )
}
