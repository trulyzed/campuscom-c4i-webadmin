import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { DatePicker, Form, Input } from "antd"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A"
export const DATE_TIME_FORMAT_NEW = "MM/DD/YYYY HH:mm"
export function FormDateTimePicker(
  props: IGeneratedField & {
    dateTimeFormat?: string
    dateTimeFormatNew?: string
  }
) {
  const dateTimeFormat = props.dateTimeFormat || DATE_TIME_FORMAT
  const dateTimeFormatNew = props.dateTimeFormatNew || DATE_TIME_FORMAT_NEW

  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useDependencyValue({ ...props })
  useEffect(() => {
    if (props.defaultValue) {
      const t1 = moment(props.defaultValue)
      setValue(t1)
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(dateTimeFormat)
      })
      props.formInstance.setFieldsValue({ [`__${props.fieldName}`]: t1 })
      console.log(t1)
      console.log(t1.format(dateTimeFormat))
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
        <DatePicker
          allowClear
          showTime
          disabled={props.disabled}
          value={value}
          onChange={(date, dateString) => {
            dateString &&
              props.formInstance.setFieldsValue({
                [props.fieldName]: dateString
              })
            setValue(date)
          }}
          format={dateTimeFormatNew}
        />
      </SearchFieldWrapper>
    </>
  )
}
