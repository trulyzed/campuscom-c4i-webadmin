import React, { useEffect, useState } from "react"
import { Button, Col, Form, Row, Tooltip } from "antd"
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { IField } from "~/Form/common"
import { FormInput } from "~/Form/FormInput"
import { FormDropDown } from "~/Form/FormDropDown"
import { FormInputNumber } from "~/Form/FormInputNumber"
import { FormTextArea } from "~/Form/FormTextArea"
import { FormMultiSelectDropDown } from "~/Form/FormMultiSelectDropDown"
import { FormMultipleCheckbox } from "~/Form/FormMultipleCheckbox"
import { FormDatePicker } from "~/Form/FormDatePicker"
import { FormDatePickers } from "~/Form/FormDatePickers"
import { FormCheckbox } from "~/Form/FormCheckbox"
import { FormMultipleRadio } from "~/Form/FormMultipleRadio"

interface IInlineForm extends IField {
  refreshEventName: string | symbol
  updateFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
}
export const InlineForm = (props: IInlineForm) => {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  useEffect(() => {
    if (!showForm) {
      formInstance.setFieldsValue({ [props.fieldName]: props.defaultValue })
      if (props.fieldName2)
        formInstance.setFieldsValue({
          [props.fieldName2]: props.defaultValue2
        })
    }
  }, [showForm, props.fieldName, props.fieldName2, props.defaultValue, props.defaultValue2, formInstance])

  const propsToPass = {
    ...props,
    label: props.label,
    labelColSpan: props.label === "" ? 0 : 6,
    wrapperColSpan: props.label === "" ? 24 : 18,
    disabled: !showForm,
    formInstance: formInstance,
    defaultValue: props.defaultValue,
    defaultValue2: props.defaultValue2
  }

  return (
    <Form form={formInstance}>
      <Row gutter={8} style={{ height: "30px" }}>
        <Col flex="auto">
          {props.inputType === "TEXT" && <FormInput {...propsToPass} />}
          {props.inputType === "NUMBER" && <FormInputNumber {...propsToPass} />}
          {props.inputType === "TEXTAREA" && <FormTextArea {...propsToPass} />}
          {props.inputType === "DROPDOWN" && <FormDropDown {...propsToPass} />}
          {props.inputType === "MULTI_SELECT_DROPDOWN" && <FormMultiSelectDropDown {...propsToPass} />}
          {props.inputType === "MULTI_SELECT_CHECKBOX" && <FormMultipleCheckbox {...propsToPass} />}
          {props.inputType === "DATE_PICKER" && <FormDatePicker {...propsToPass} />}
          {props.inputType === "DATE_PICKERS" && <FormDatePickers {...propsToPass} />}
          {props.inputType === "BOOLEAN" && <FormCheckbox {...propsToPass} />}
          {props.inputType === "MULTI_RADIO" && <FormMultipleRadio {...propsToPass} />}
        </Col>
        {!showForm && (
          <Col flex="20px">
            <Tooltip title="Edit">
              <Button
                type="primary"
                aria-label="edit"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => setShowForm(true)}
              />
            </Tooltip>
          </Col>
        )}
        {showForm && (
          <Col flex="20px">
            <Tooltip title="Update">
              <Button
                ghost
                aria-label="Update form"
                type="primary"
                shape="circle"
                loading={apiCallInProgress}
                icon={<CheckOutlined />}
                onClick={() => {
                  setApiCallInProgress(true)
                  props.updateFunc(formInstance.getFieldsValue()).then((x) => {
                    if (x.success) {
                      eventBus.publish(props.refreshEventName)
                      setShowForm(false)
                    }
                    setApiCallInProgress(false)
                  })
                }}
              />
            </Tooltip>
          </Col>
        )}

        {showForm && (
          <Col flex="20px">
            <Tooltip title="Close">
              <Button
                danger
                aria-label="close form"
                type="default"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => {
                  formInstance.resetFields()
                  setShowForm(false)
                }}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
    </Form>
  )
}
