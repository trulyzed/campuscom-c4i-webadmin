import React, { useEffect } from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { DatePicker, Input, Form } from "antd"
import moment from "moment"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

const DATE_FORMAT = "MM/DD/YYYY"
export function FormDatePickers(props: IGeneratedField & { dateFormate?: string }) {
  const dateFormat = props.dateFormate || DATE_FORMAT
  const fieldName = `___${props.fieldName}${props.fieldName2}`
  useDependencyValue({ ...props })
  useEffect(() => {
    const t1 = moment(props.defaultValue)
    const t2 = moment(props.defaultValue2)

    if (props.defaultValue && props.defaultValue2 && props.fieldName2) {
      props.formInstance.setFieldsValue({ [fieldName]: [t1, t2] })
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(dateFormat)
      })
      props.formInstance.setFieldsValue({
        [props.fieldName2]: t2.format(dateFormat)
      })
    } else if (props.defaultValue) {
      props.formInstance.setFieldsValue({ [fieldName]: [t1, ""] })
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(dateFormat)
      })
    } else if (props.defaultValue2 && props.fieldName2) {
      props.formInstance.setFieldsValue({ [fieldName]: ["", t2] })
      props.formInstance.setFieldsValue({
        [props.fieldName2]: t2.format(dateFormat)
      })
    }
    // eslint-disable-next-line
  }, [props.defaultValue, props.defaultValue2])
  return (
    <>
      <Form.Item colon={false} style={{ display: "none" }} name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item colon={false} style={{ display: "none" }} name={props.fieldName2}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName={fieldName}>
        <DatePicker.RangePicker
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          style={{ width: "100%" }}
          allowEmpty={[true, true]}
          disabled={props.disabled}
          allowClear
          onChange={(dates: any, dateStrings: any): void => {
            props.formInstance.setFieldsValue({
              [props.fieldName]: dateStrings[0]
            })
            if (props.fieldName2) {
              props.formInstance.setFieldsValue({
                [props.fieldName2]: dateStrings[1]
              })
            }
          }}
          format={dateFormat}
        />
      </SearchFieldWrapper>
    </>
  )
}
