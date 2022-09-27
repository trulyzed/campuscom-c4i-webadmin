import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { Form, Input } from "antd"
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css"
import { Datepicker } from "@salesforce/design-system-react"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { HELPER_FIELD_PATTERN } from "./MetaDrivenForm"
import { DATE_DISPLAY_FORMAT } from "~/Configs/format"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormDatePicker(props: IGeneratedField & { dateFormate?: string }) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useDependencyValue({ ...props })
  useEffect(() => {
    const date = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (date) {
      const t1 = moment(date)
      setValue(t1.toDate())
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.toISOString()
      })
      props.formInstance.setFieldsValue({ [`${HELPER_FIELD_PATTERN}${props.fieldName}`]: t1.toISOString() })
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  useEffect(() => {
    if(!firstRender){
      setValue(undefined)
    }
    // eslint-disable-next-line
  }, [props.clearTrigger])

  return (
    <>
      <Form.Item colon={false} style={{ display: "none" }} name={props.fieldName}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper
        {...props}
        fieldName={`${HELPER_FIELD_PATTERN}${props.fieldName}`}
      >
        <Datepicker
          id={'datepicker_component'}
          allowClear
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={value}
          onChange={(event: any, data: { formattedDate: Date } ) => {
            const formattedDate = moment(data.formattedDate, DATE_DISPLAY_FORMAT).toISOString()
            props.formInstance.setFieldsValue({
              [props.fieldName]: formattedDate
            })
            setValue(moment(formattedDate).toDate())
            props.onSelectedItems && props.onSelectedItems(formattedDate)
          }}
          formatter={(date: Date) => {
            if(date && typeof date.getMonth === 'function'){
              const momentDate = moment(date)
              return momentDate.format(DATE_DISPLAY_FORMAT)
            }else{
              if(value && typeof value.getMonth === 'function'){
                return moment(value).format(DATE_DISPLAY_FORMAT)
              }else{
                return ''
              }
            }
          }}
          parser={(dateString: string) => {
            console.log(dateString)
            return moment(dateString, DATE_DISPLAY_FORMAT).toDate();
          }}
        />
    </SearchFieldWrapper>
    </>
  )
}
