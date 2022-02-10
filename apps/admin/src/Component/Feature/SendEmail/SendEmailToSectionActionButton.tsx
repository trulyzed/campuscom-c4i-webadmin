import { useEffect, useState } from "react"
import { Button, Form, FormInstance, Input, message, Upload } from "antd"
import { ActionPage } from "@packages/components/lib/Page/ActionPage"
import { CustomFormStructure } from "@packages/components/lib/Form/CustomFormStructure"
import { FormInput } from "@packages/components/lib/Form/FormInput"
import { FormTextArea } from "@packages/components/lib/Form/FormTextArea"
import { UploadOutlined } from "@ant-design/icons"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { sendEmail } from "~/ApiServices/Service/NotificationService"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { findPreferredEmail } from "~/ApiServices/BizApi/person/personIF"
import { findSectionRoster } from "~/ApiServices/BizApi/Faculty/facultyif"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { UPDATE_SUCCESSFULLY } from "~/Constants"

interface ISendEmailToSectionFieldNames {
  FromEmailAddress: any
  FromUserID: any
  Subject: any
  Message: any
  MimeType: any
  ToEmailAddress: any
  ToUserIDRecipients: any
  FileName: any
  FileContent: any
  Attachments: any
}

const fieldNames: ISendEmailToSectionFieldNames = {
  FromEmailAddress: "FromEmailAddress",
  FromUserID: "FromUserID",
  Subject: "Subject",
  Message: "Message",
  MimeType: "MimeType",
  ToEmailAddress: "ToEmailAddress",
  ToUserIDRecipients: "ToUserIDRecipients",
  FileName: "FileName",
  FileContent: "FileContent",
  Attachments: "Attachments"
}

const layout = {
  labelCol: { span: 6 }
}

const SendEmailToSectionForm = (props: { formInstance: FormInstance; SectionID: number }) => {
  const [attachments, setAttachments] = useState<any>([])

  const onFileUpload = (file: any) => {
    const file_name = file.file.name
    if (file.file.status === "removed") {
      const newAttachments = attachments.filter((attachment: any) => attachment.FileName !== file_name)
      props.formInstance.setFieldsValue({
        Attachments: [...newAttachments]
      })

      setAttachments(newAttachments)
    } else {
      file.file.status = "done"

      props.formInstance.setFieldsValue({
        FileName: file_name
      })
      getBase64(file.file.originFileObj).then((contents: any) => {
        const newAttachments = [...attachments, { FileName: file_name, FileContent: contents }]
        props.formInstance.setFieldsValue({
          FileContent: contents,
          Attachments: [...newAttachments]
        })
        setAttachments(newAttachments)
      })
    }
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  return (
    <>
      <Form.Item colon={false} style={{ display: "none" }} name="FileName">
        <Input />
      </Form.Item>
      <Form.Item colon={false} style={{ display: "none" }} name="FileContent">
        <Input />
      </Form.Item>
      <Form.Item colon={false} style={{ display: "none" }} name="Attachments">
        <Input />
      </Form.Item>
      <FormInput
        formInstance={props.formInstance}
        label={"Subject"}
        ariaLabel={"Subject"}
        maxLength={128}
        fieldName={fieldNames.Subject}
        rules={[
          {
            required: true,
            message: "Subject is required"
          }
        ]}
      />
      <FormTextArea
        formInstance={props.formInstance}
        label={"Message"}
        ariaLabel={"Message"}
        maxLength={2000}
        fieldName={fieldNames.Message}
        rules={[
          {
            required: true,
            message: "Message is required"
          }
        ]}
      />
      <Form.Item colon={false} label="Attachments" {...layout}>
        <Upload onChange={(e) => onFileUpload(e)}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
    </>
  )
}

export function SendEmailToSectionActionButton(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>({})
  const [redirectAfterSend, setRedirectAfterSend] = useState<string>()
  const [redirectAfterCancel, setRedirectAfterCancel] = useState<string>()
  const [fromEmailAddress, setFromEmailAddress] = useState("")
  const [toEmailAddress, setToEmailAddress] = useState("")

  const IsCompletedSectionFromQueryParams: any = querystringToObject()

  useEffect(() => {
    const Faculty: any = getUser()
    findPreferredEmail({ PersonID: Faculty.PersonID }).then((res) => {
      if (res.success) {
        setFromEmailAddress(res.data.EmailAddress)
      }
    })
    findSectionRoster({ SectionID: SectionID, FacultyID: Faculty.FacultyID }).then((res) => {
      if (res.success) {
        let emailAddress = ""
        res.data.forEach((element: any) => {
          if (element.EmailAddress !== null && element.EmailAddress !== "") {
            if (emailAddress.length !== 0) emailAddress += ","
            emailAddress += element.EmailAddress
          }
        })
        setToEmailAddress(emailAddress)
      }
    })
  }, [SectionID])

  const onFormSubmission = async () => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    setErrorMessages([])
    setApiCallInProgress(true)
    if (fromEmailAddress.length !== 0 && toEmailAddress.length !== 0) {
      params["FromEmailAddress"] = fromEmailAddress
      params["ToEmailAddress"] = toEmailAddress
      params["MimeType"] = "text/plain"

      const response = await sendEmail(params)
      setApiCallInProgress(false)

      if (response && response.success) {
        formInstance.resetFields()
        message.success(UPDATE_SUCCESSFULLY)
        IsCompletedSectionFromQueryParams.IsCompletedSection
          ? setRedirectAfterSend(`/completed-sections/${SectionID}`)
          : setRedirectAfterSend(`/current-sections/${SectionID}`)
      } else {
        setErrorMessages(response.error)
        console.log(response)
      }
    }
  }

  return (
    <>
      {redirectAfterSend && <Redirect to={redirectAfterSend} />}
      {redirectAfterCancel && <Redirect to={redirectAfterCancel} />}
      <ActionPage>
        <CustomFormStructure
          closeModal={() =>
            IsCompletedSectionFromQueryParams.IsCompletedSection
              ? setRedirectAfterCancel(`/completed-sections/${SectionID}`)
              : setRedirectAfterCancel(`/current-sections/${SectionID}`)
          }
          applyButtonLabel="Send"
          formTitle={""}
          formInstance={formInstance}
          onFormSubmission={onFormSubmission}
          initialValues={initialValues}
          apiCallInProgress={apiCallInProgress}
          loading={loading}
          errorMessages={errorMessages}
          customForm={<SendEmailToSectionForm formInstance={formInstance} SectionID={SectionID} />}
        />
      </ActionPage>
    </>
  )
}
