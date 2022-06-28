import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/packages/components/Form/common"
import { DatePicker, Form, Input } from "antd"
import { useFirstRender } from "~/packages/components/Hooks/useFirstRender"
import { HELPER_FIELD_PATTERN } from "./MetaDrivenForm"
import { DATE_DISPLAY_FORMAT, DATE_PAYLOAD_FORMAT } from "~/Configs/format"

export function FormDatePicker(props: IGeneratedField & { dateFormate?: string }) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    const date = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (date) {
      const t1 = moment(date)
      setValue(t1)
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(props.dateFormate || DATE_PAYLOAD_FORMAT)
      })
      props.formInstance.setFieldsValue({ [`${HELPER_FIELD_PATTERN}${props.fieldName}`]: t1 })
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
      <SearchFieldWrapper {...props} fieldName={`${HELPER_FIELD_PATTERN}${props.fieldName}`}>
        {/* {value && ( */}
        <DatePicker
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          allowClear
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={value}
          onChange={(date) => {
            const formattedDate = date?.format(props.dateFormate || DATE_PAYLOAD_FORMAT)
            props.formInstance.setFieldsValue({
              [props.fieldName]: formattedDate
            })
            setValue(date)
            props.onSelectedItems && props.onSelectedItems(formattedDate)
          }}
          format={DATE_DISPLAY_FORMAT}
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
