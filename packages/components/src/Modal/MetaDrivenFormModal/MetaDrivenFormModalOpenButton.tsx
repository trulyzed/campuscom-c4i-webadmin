import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import React, { CSSProperties, useState } from "react"
import { IField } from "~/Form/common"
import { MetaDrivenFormModal } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { IconButton, iconType } from "~/Form/Buttons/IconButton"
import { checkInstructorApiPermission } from "@packages/api/lib/Permission/InstructorApiPermission"
interface IMetaDrivenFormModalOpenButton {
  buttonLabel: string
  iconType?: iconType
  buttonProps?: BaseButtonProps
  style?: CSSProperties
  formTitle: React.ReactNode
  formMeta: IField[]
  formMetaName?: string
  isHorizontal?: boolean
  formSubmitApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  helpkey?: string
}
export const MetaDrivenFormModalOpenButton = (props: IMetaDrivenFormModalOpenButton) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {checkInstructorApiPermission(props.formSubmitApi) && (
        <>
          {" "}
          {props.iconType ? (
            <IconButton iconType={props.iconType} onClick={() => setShowModal(true)} toolTip={props.buttonLabel} />
          ) : (
            <Button type="primary" {...props.buttonProps} style={props.style} onClick={() => setShowModal(true)} children={props.buttonLabel} />
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
