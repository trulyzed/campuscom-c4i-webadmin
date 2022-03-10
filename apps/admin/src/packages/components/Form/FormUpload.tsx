import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Button, message, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"

export function FormUpload(props: IGeneratedField) {
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const customRequest = (options: any) => {
    const file = options.file
    const isCSV =
      file.type === "text/csv" || file.type === "application/csv" || file.type === "application/vnd.ms-excel"
    if (!isCSV) {
      message.error("You can only upload CSV file!")
      setTimeout(() => {
        options.onError("error")
      }, 0)
    } else {
      props.formInstance.setFieldsValue({ FileName: file.name })
      getBase64(file).then((contents: any) => {
        props.formInstance.setFieldsValue({ FileContent: contents })
      })
      setTimeout(() => {
        options.onSuccess("ok")
      }, 0)
    }
  }

  return (
    <SearchFieldWrapper {...props}>
      <Upload disabled={props.disabled} customRequest={customRequest}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </SearchFieldWrapper>
  )
}
