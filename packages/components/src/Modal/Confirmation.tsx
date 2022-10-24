import React from "react"
import { Modal, notification } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/services/lib/Api/utils/Interfaces"

export const promptConfirmation = async (
  remove: () => Promise<IApiResponse>,
  { actionType, success, error, title, warningText, setIsProcessing }: { actionType?: string; success?: string; error?: string; title?: string; warningText?: string; setIsProcessing?: (status: boolean) => void } = {}
) => {
  actionType = actionType || 'Delete'
  success = success || `${actionType} Successful`
  error = error || `${actionType} Unsuccessful`
  title = title || `Are you sure to ${actionType.toLowerCase()} this?`
  warningText = warningText || ""

  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: warningText,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setIsProcessing?.(true)
        remove().then((result: IApiResponse) => {
          if (result.success) {
            notification.success({ message: success })
            resolve(true)
          }
          else {
            if (typeof result.error === "string") notification.error({ message: result.error })
            else if (Array.isArray(result.error) && result.error.length > 0) {
              result.error.forEach((err) => notification.error({ message: err.message }))
            } else {
              notification.error({ message: error })
            }
            reject(false)
          }
        }).finally(() => {
          setIsProcessing?.(false)
        })
      },
      onCancel() {
        console.log("Cancel")
        reject(false)
      }
    })
  })
}