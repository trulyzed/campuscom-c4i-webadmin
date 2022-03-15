import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import React, { CSSProperties, useState } from "react"
import { IField } from "~/packages/components/Form/common"
import { MetaDrivenFormModal } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { IconButton, iconType } from "~/packages/components/Form/Buttons/IconButton"
import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
interface IMetaDrivenFormModalOpenButton {
  buttonLabel: string
  iconType?: iconType
  buttonProps?: BaseButtonProps
  style?: CSSProperties
  formTitle: React.ReactNode
  formMeta: IField[]
  formMetaName?: string
  isHorizontal?: boolean
  formSubmitApi: IQuery
  initialFormValue?: { [key: string]: any }
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
          {props.iconType ? (
            <IconButton iconType={props.iconType} onClick={() => setShowModal(true)} toolTip={props.buttonLabel} />
          ) : (
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
          isHorizontal={props.isHorizontal}
          meta={props.formMeta}
          metaName={props.formMetaName}
          formSubmitApi={props.formSubmitApi}
          initialFormValue={props.initialFormValue}
          defaultFormValue={props.defaultFormValue}
          refreshEventAfterFormSubmission={props.refreshEventName}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
