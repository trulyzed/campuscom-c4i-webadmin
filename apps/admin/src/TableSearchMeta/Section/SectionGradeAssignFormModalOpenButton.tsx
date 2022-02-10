import React, { useState } from "react"
import { Col, message, Row } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import Form, { FormInstance } from "antd/lib/form"
import { FormDropDown } from "@packages/components/lib/Form/FormDropDown"
import { ASSIGN_SUCCESSFULLY } from "~/Constants"
import { CustomFormModalOpenButton } from "@packages/components/lib/Modal/FormModal/CustomFormModalOpenButton"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { FormInputNumber } from "@packages/components/lib/Form/FormInputNumber"
import { submitFinalGrade } from "~/ApiServices/Service/GradingService"
import { REFRESH_GRADE_TAB } from "~/Pages/CurrentSections/CurrentSectionsDetailsPage"

interface ISectionGradeAssignFormProps {
  fieldNames: ISiteFieldNames
  initialFormValue: { [key: string]: any }
  formInstance: FormInstance
}
export interface ISiteFieldNames {
  GradeScoreDefinitionID: any
  AttendanceActual: any
}

const fieldNames: ISiteFieldNames = {
  GradeScoreDefinitionID: "GradeScoreDefinitionID",
  AttendanceActual: "AttendanceActual"
}
const SectionGradeAssignForm = (props: ISectionGradeAssignFormProps) => {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <FormInputNumber formInstance={props.formInstance} label={"Attendance Actual"} ariaLabel={"Attendance Actual"} maxLength={128} fieldName={props.fieldNames.AttendanceActual} />
          <FormDropDown
            formInstance={props.formInstance}
            label={"Assign Grade"}
            ariaLabel={"Assign Grade"}
            fieldName={props.fieldNames.GradeScoreDefinitionID}
            options={[
              { label: "A", value: 0 },
              { label: "B", value: 1 },
              { label: "C", value: 2 },
              { label: "D", value: 3 },
              { label: "F", value: 4 },
              { label: "Incomplete", value: 5 }
            ]}
          />
        </Col>
      </Row>
    </>
  )
}
export function SectionGradeAssignFormModalOpenButton(props: { initialFormValue: { [key: string]: any }; SiteID?: number; helpkey?: string }) {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async (closeModal: () => void) => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue(true)
    setErrorMessages([])
    setApiCallInProgress(true)

    const response = await submitFinalGrade(params)
    setApiCallInProgress(false)
    if (response && response.success) {
      formInstance.resetFields()
      message.success(ASSIGN_SUCCESSFULLY)
      eventBus.publish(REFRESH_GRADE_TAB)
      closeModal()
    } else {
      console.log("validation failed ", response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <>
      <CustomFormModalOpenButton
        formTitle="Add Actual Attendance & Assign grade"
        submitFunction={submitFinalGrade}
        helpKey={props.helpkey}
        customForm={<SectionGradeAssignForm fieldNames={fieldNames} initialFormValue={props.initialFormValue} formInstance={formInstance} />}
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={props.initialFormValue}
        apiCallInProgress={apiCallInProgress}
        iconType="edit"
        loading={loading}
        errorMessages={errorMessages}
        buttonLabel="Add Actual Attendance & Assign grade"
        buttonProps={{ type: props.SiteID ? "link" : "primary" }}
      />
    </>
  )
}
