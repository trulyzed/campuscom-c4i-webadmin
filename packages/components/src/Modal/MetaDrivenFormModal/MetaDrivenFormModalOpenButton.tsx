import React, { CSSProperties, useState } from "react"
import { Button } from "antd"
import { History } from "history"
import { BaseButtonProps } from "antd/lib/button/button"
import { IField } from "~/Form/common"
import { MetaDrivenFormModal } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { IconButton, iconType } from "~/Form/Buttons/IconButton"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { ContextAction } from "~/Actions/ContextAction"
interface IMetaDrivenFormModalOpenButton {
  buttonLabel: string
  iconType?: iconType
  buttonProps?: BaseButtonProps
  style?: CSSProperties
  formTitle: React.ReactNode
  formMeta: IField[]
  formMetaName?: string
  isVertical?: boolean
  formSubmitApi: IQuery
  onFormSubmit?: (data?: any, navigator?: History['push']) => void
  initialFormValue?: { [key: string]: any }
  initialFormValueApi?: IQuery
  defaultFormValue?: { [key: string]: any }
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  helpkey?: string
}
export const MetaDrivenFormModalOpenButton = (props: IMetaDrivenFormModalOpenButton) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {checkAdminApiPermission(props.formSubmitApi) && (
        <>
          {" "}
          {props.iconType === "create" ?
            <IconButton iconType={props.iconType} onClick={() => setShowModal(true)} toolTip={props.buttonLabel} title={props.buttonLabel} />
            : (props.iconType === "edit") || (props.iconType === "remove") ? <ContextAction tooltip={props.buttonLabel} type={props.iconType === "remove" ? "delete" : "edit"} onClick={() => setShowModal(true)} />
              : (
                <Button
                  type="primary"
                  {...props.buttonProps}
                  style={props.style}
                  onClick={() => setShowModal(true)}
                  children={props.buttonLabel}
                />
              )}
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
          onFormSubmit={props.onFormSubmit}
          initialFormValue={props.initialFormValue}
          initialFormValueApi={props.initialFormValueApi}
          defaultFormValue={props.defaultFormValue}
          refreshEventAfterFormSubmission={props.refreshEventName}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
