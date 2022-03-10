import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/packages/components/Form/common"
import { DatePicker, Form, Input } from "antd"
import { useFirstRender } from "~/packages/components/Hooks/useFirstRender"

const DATE_FORMAT = "MM/DD/YYYY"
export function FormDatePicker(props: IGeneratedField & { dateFormate?: string }) {
  const dateFormat = props.dateFormate || DATE_FORMAT
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    const date = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (date) {
      const t1 = moment(date)
      setValue(t1)
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(dateFormat)
      })
      props.formInstance.setFieldsValue({ [`__${props.fieldName}`]: t1 })
      console.log(t1)
      console.log(t1.format(dateFormat))
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  useEffect(() => {
    !firstRender && setValue(undefined)
    // eslint-disable-next-line
  }, [props.clearTrigger])
  return (
    <>
      <Form.Item colon={false} style={{ display: "none" }} name={props.fieldName}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName={`__${props.fieldName}`}>
        {/* {value && ( */}
        <DatePicker
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          allowClear
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={value}
          onChange={(date, dateString) => {
            dateString &&
              props.formInstance.setFieldsValue({
                [props.fieldName]: dateString
              })
            setValue(date)
            props.onSelectedItems && props.onSelectedItems(dateString)
          }}
          format={dateFormat}
        />
        {/* )}
        {!value && (
          <DatePicker
            allowClear
            disabled={props.disabled}
            onChange={(date, dateString) => {
              dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
              setValue(date)
            }}
            format={dateFormat}
          />
        )} */}
      </SearchFieldWrapper>
    </>
  )
}
