import React from "react"
import { Modal } from "~/Modal/Modal"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { FormInstance } from "antd/lib/form"
import { CustomFormStructure } from "~/Form/CustomFormStructure"

export interface ICustomFormModal {
  formTitle: string
  customForm: JSX.Element
  formInstance: FormInstance
  closeModal: () => void
  onFormSubmission: (closeModal: () => void) => void
  initialValues: { [key: string]: any }
  apiCallInProgress?: boolean
  loading: boolean
  errorMessages: Array<ISimplifiedApiErrorMessage>
  setErrorMessages?: (err: Array<ISimplifiedApiErrorMessage>) => void
  extraButtons?: JSX.Element[]
  helpKey?: string
  zIndex?: number
  applyButtonLabel?: string
  layout?: "horizontal" | "inline" | "vertical"
}

export function CustomFormModal(props: ICustomFormModal) {
  return (
    <Modal
      closeModal={props.closeModal}
      zIndex={props.zIndex}
      width="1000px"
      loading={props.loading}
      apiCallInProgress={props.apiCallInProgress}
    >
      <CustomFormStructure {...props} />
    </Modal>
  )
}
