import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Form } from "antd"
import { History } from "history"
import { Modal } from "~/packages/components/Modal/Modal"
import { zIndexLevel } from "~/packages/components/zIndexLevel"
import { IField } from "~/packages/components/Form/common"
import { eventBus } from "~/packages/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export const MetaDrivenFormModal = (props: {
  title: React.ReactNode
  meta: IField[]
  metaName?: string
  helpKey?: string
  isVertical?: boolean
  initialFormValue?: { [key: string]: any }
  initialFormValueApi?: IQuery
  defaultFormValue?: { [key: string]: any }
  formSubmitApi: IQuery
  onFormSubmit?: (data?: any, navigator?: History['push']) => void
  closeModal: () => void
  refreshEventAfterFormSubmission?: string | symbol | symbol[] | string[] | Array<string | symbol>
}) => {
  const { initialFormValueApi } = props
  const history = useHistory();
  const [formInstance] = Form.useForm()
  const [initialFormValue, setInitialFormValue] = useState(props.initialFormValue ? { ...props.initialFormValue } : undefined)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const [loading, setLoading] = useState(!!initialFormValueApi)
  const clearParams = () => {
    Object.keys(formInstance.getFieldsValue()).forEach((key) => formInstance.setFieldsValue({ [key]: undefined }))
    setClearTrigger(!clearTrigger)
  }

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
        closeModal()
        props.onFormSubmit?.(x.data, history.push)
      } else {
        setError(x.error)
        setLoading(false)
      }
    })
  }

  const closeModal = () => {
    clearParams()
    props.closeModal()
  }

  useEffect(() => {
    if (!initialFormValueApi) return
    initialFormValueApi().then(resp => {
      if (resp.success) {
        setInitialFormValue(prevValue => ({
          ...prevValue,
          ...resp.data
        }))
      }
      return resp
    }).finally(() => setLoading(false))
  }, [initialFormValueApi])

  return (
    <Modal closeModal={props.closeModal} width="1000px" zIndex={zIndexLevel.defaultModal}>
      <MetaDrivenForm
        meta={props.meta}
        metaName={props.metaName}
        title={props.title}
        helpKey={props.helpKey}
        loading={loading}
        isVertical={props.isVertical}
        isModal={true}
        closeModal={props.closeModal}
        initialFormValue={initialFormValue}
        defaultFormValue={props.defaultFormValue}
        applyButtonLabel="Submit"
        stopProducingQueryParams={true}
        errorMessages={error}
        onApplyChanges={submit}
      />
    </Modal>
  )
}
