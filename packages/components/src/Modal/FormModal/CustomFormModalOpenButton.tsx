import React, { CSSProperties, useEffect, useState } from "react"
import { Button } from "antd"
import { BaseButtonProps } from "antd/lib/button/button"
import { CustomFormModal, ICustomFormModal } from "~/Modal/FormModal/CustomFormModal"
import { IconButton, iconType } from "~/Form/Buttons/IconButton"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { checkInstructorApiPermission } from "@packages/api/lib/Permission/InstructorApiPermission"

export interface ICustomFormModalOpenButton extends Omit<ICustomFormModal, "closeModal"> {
  style?: CSSProperties
  buttonLabel: string
  buttonProps?: BaseButtonProps
  iconType?: iconType
  extraButtons?: JSX.Element[]
  disabled?: boolean
  zIndex?: number
  submitFunction: (Params: any, Headers?: any) => Promise<IApiResponse>
  showModalCallBackFunc?: (params: any) => void
}

export const CustomFormModalOpenButton = (props: ICustomFormModalOpenButton) => {
  const [showModal, setShowModal] = useState(false)
  let ButtonType: JSX.Element

  if (props.iconType) {
    ButtonType = <IconButton toolTip={props.buttonLabel} iconType={props.iconType} disabled={props.disabled} onClick={() => setShowModal(true)} />
  } else {
    ButtonType = (
      <Button style={props.style} disabled={props.disabled} {...props.buttonProps} onClick={() => setShowModal(true)}>
        {props.buttonLabel}
      </Button>
    )
  }

  useEffect(() => {
    if (showModal) props.formInstance.setFieldsValue(props.initialValues)
    props.showModalCallBackFunc && showModal && props.showModalCallBackFunc(props)
    if (!showModal) {
      props.formInstance.resetFields()
      props.setErrorMessages && props.setErrorMessages([])
    }
    // eslint-disable-next-line
  }, [showModal])

  return (
    <>
      <>{checkInstructorApiPermission(props.submitFunction) && ButtonType}</>
      {showModal && (
        <CustomFormModal
          zIndex={props.zIndex}
          {...props}
          closeModal={() => {
            props.setErrorMessages && props.setErrorMessages([])
            props.formInstance.resetFields()
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}
