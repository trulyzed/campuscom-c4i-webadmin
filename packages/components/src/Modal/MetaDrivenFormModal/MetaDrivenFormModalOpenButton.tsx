import React, { CSSProperties, useState } from "react"
import { Button } from "antd"
import { History } from "history"
import { BaseButtonProps, ButtonProps } from "antd/lib/button/button"
import { IField } from "~/Form/common"
import { MetaDrivenFormModal } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { ActionType, ContextAction } from "~/Actions/ContextAction"
import { IconButton } from "~/Form/Buttons/IconButton"
interface IMetaDrivenFormModalOpenButton {
  buttonLabel: string
  iconType?: ActionType
  buttonProps?: BaseButtonProps
  style?: CSSProperties
  formTitle: React.ReactNode
  formMeta: IField[]
  formMetaName?: string
  isVertical?: boolean
  formSubmitApi: IQuery
  dataQueryApi?: IQuery
  onFormSubmit?: (data?: any, navigator?: History['push']) => void
  initialFormValue?: { [key: string]: any }
  initialFormValueApi?: IQuery
  displayFieldValue?: Record<string, any>
  defaultFormValue?: { [key: string]: any }
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  helpkey?: string
  textOnly?: boolean
  buttonType?: ButtonProps["type"]
  buttonSize?: ButtonProps["size"]
}
export const MetaDrivenFormModalOpenButton = (props: IMetaDrivenFormModalOpenButton) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {checkAdminApiPermission(props.formSubmitApi) && (
        <>
          {" "}
          {(props.iconType === "create" || props.iconType === "filter") ?
            <IconButton iconType={props.iconType} onClick={() => setShowModal(true)} toolTip={props.buttonLabel} title={props.buttonLabel} />
            : props.iconType ?
              <ContextAction
                textOnly={props.textOnly}
                text={props.textOnly ? props.buttonLabel : undefined}
                tooltip={props.buttonLabel}
                type={props.iconType}
                onClick={() => setShowModal(true)}
                refreshEventName={props.refreshEventName} />
              : (
                <Button
                  type={props.buttonType || "primary"}
                  {...props.buttonProps}
                  style={props.style}
                  onClick={() => setShowModal(true)}
                  children={props.buttonLabel}
                  size={props.buttonSize}
                />
              )
          }
        </>
      )}
      {showModal && (
        <MetaDrivenFormModal
          title={props.formTitle}
          helpKey={props.helpkey}
          isVertical={props.isVertical}
          meta={props.formMeta}
          metaName={props.formMetaName}
          formSubmitApi={props.formSubmitApi}
          dataQueryApi={props.dataQueryApi}
          onFormSubmit={props.onFormSubmit}
          initialFormValue={props.initialFormValue}
          initialFormValueApi={props.initialFormValueApi}
          displayFieldValue={props.displayFieldValue}
          defaultFormValue={props.defaultFormValue}
          refreshEventAfterFormSubmission={props.refreshEventName}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
