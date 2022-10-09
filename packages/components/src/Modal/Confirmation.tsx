import React from "react"
import { Modal, notification } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/services/lib/Api/utils/Interfaces"

export const showDeleteConfirm = async (
  remove: () => Promise<IApiResponse>,
  { success, error, title, warningText, setIsProcessing }: { success?: string; error?: string; title?: string; warningText?: string; setIsProcessing?: (status: boolean) => void } = {}
) => {
  success = success || "Delete Successfull"
  error = error || "Delete Unsuccessfull"
  title = title || "Are you sure to delete this?"
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

export const showConfirm = (
  confirm: () => Promise<IApiResponse>,
  success = "Successfull",
  error = "Unsuccessfull",
  title = "A person with this information already exists.  Do you really want to create a new person with this information?",
  warningText = ""
) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: warningText,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      confirm().then((result: any) => {
        if (result.success) notification.success({ message: success })
        else notification.error({ message: error })
      })
    },
    onCancel() {
      console.log("Cancel")
    }
  })
}
