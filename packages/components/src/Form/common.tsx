import React from "react"
import { Form } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { FormInstance, Rule } from "antd/lib/form"
import { ValidateStatus } from "antd/lib/form/FormItem"

export const TEXT = "TEXT"
export const TEXTAREA = "TEXTAREA"
export const DROPDOWN = "DROPDOWN"
export const MULTI_SELECT_DROPDOWN = "MULTI_SELECT_DROPDOWN"
export const MULTI_RADIO = "MULTI_RADIO"
export const DATE_PICKER = "DATE_PICKER"
export const DATE_PICKERS = "DATE_PICKERS"
export const NUMBER = "NUMBER"
export const BOOLEAN = "BOOLEAN"
export const MULTI_SELECT_CHECKBOX = "MULTI_SELECT_CHECKBOX"
export const CUSTOM_FIELD = "CUSTOM_FIELD"

export type IFieldType =
  | typeof TEXT
  | typeof TEXTAREA
  | typeof DROPDOWN
  | typeof MULTI_SELECT_DROPDOWN
  | typeof DATE_PICKER
  | typeof DATE_PICKERS
  | typeof NUMBER
  | typeof BOOLEAN
  | typeof MULTI_SELECT_CHECKBOX
  | typeof CUSTOM_FIELD
  | typeof MULTI_RADIO

export interface IField {
  label: React.ReactNode
  inputType: IFieldType
  sortOrder?: number
  hidden?: boolean
  placeholder?: string
  disabled?: boolean
  helpkey?: string

  fieldName: string
  defaultValue?: any
  displayKey?: string
  valueKey?: string
  ariaLabel?: string

  fieldName2?: string
  defaultValue2?: any
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string
  extraProps?: { [key: string]: any }
  options?: any[]
  refLookupService?: () => Promise<IApiResponse>
  customFilterComponent?: React.FunctionComponent<any>
  rules?: Rule[]
  required?: boolean
  validateStatus?: ValidateStatus
  help?: string | React.ReactNode
  labelColSpan?: number
  wrapperColSpan?: number
  maxLength?: number
  onSelectedItems?: (items: any) => void
  searchFieldName?: string
  formItemStyle?: React.CSSProperties
  maxValue?: number
}

export interface IGeneratedField extends Omit<IField, "inputType"> {
  formInstance: FormInstance
  clearTrigger?: boolean
}

export function SearchFieldWrapper(props: IGeneratedField & { children?: React.ReactNode }) {
  const _rules: Array<{ [key: string]: any }> = props.rules as Array<{ [key: string]: any }>

  if (props.required) _rules.push({ required: true, message: `Please enter ${props.label}` })

  const rulesRequired = !!_rules?.find((rule: any) => rule && rule.required) || props.required

  return (
    <Form.Item
      colon={false}
      label={props.label}
      labelCol={{ span: props.labelColSpan !== undefined ? props.labelColSpan : 6 }}
      wrapperCol={{ span: props.wrapperColSpan !== undefined ? props.wrapperColSpan : 16 }}
      {...(props.fieldName === "" ? { name: `__${props.fieldName}` } : { name: props.fieldName })}
      {...(props.hidden && { className: "hidden" })}
      {...(props.extraProps && props.extraProps.valuePropName && { valuePropName: "checked" })}
      required={rulesRequired}
      rules={props.rules}
      validateStatus={props.validateStatus}
      help={props.help}
      style={props.formItemStyle}
    >
      {props.children}
    </Form.Item>
  )
}

export function SearchComponentWrapper(
  props: Omit<IGeneratedField, "fieldName"> & {
    children?: React.ReactNode
    rulesRequired?: boolean
  }
) {
  return (
    <Form.Item
      colon={false}
      label={props.label}
      labelCol={{ span: props.labelColSpan !== undefined ? props.labelColSpan : 6 }}
      wrapperCol={{ span: props.wrapperColSpan !== undefined ? props.wrapperColSpan : 16 }}
      rules={props.rules}
      validateStatus={props.validateStatus}
      help={props.help}
      required={props.rulesRequired}
      style={props.formItemStyle}
    >
      {props.children}
    </Form.Item>
  )
}
