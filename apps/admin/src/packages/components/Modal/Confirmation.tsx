import React from "react"
import { message, Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"

export const showDeleteConfirm = async (
  remove: () => Promise<IApiResponse>,
  { success, error, title, warningText }: { success?: string; error?: string; title?: string; warningText?: string } = {
    success: "Delete Successfull",
    error: "Delete Unsuccessfull",
    title: "Are you sure to delete this?",
    warningText: ""
  }
) => {
  return new Promise<boolean>((resolve, reject) => {
    Modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: warningText,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        remove().then((result: IApiResponse) => {
          if (result.success) {
            message.success(success, 2)
            resolve(true)
          }
          else {
            if (typeof result.error === "string") message.error(result.error, 2)
            else if (Array.isArray(result.error) && result.error.length > 0) {
              result.error.forEach((err) => message.error(err.message, 2))
            } else {
              message.error(error, 2)
            }
            reject(false)
          }
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
        if (result.success) message.success(success, 2)
        else message.error(error)
      })
    },
    onCancel() {
      console.log("Cancel")
    }
  })
}
