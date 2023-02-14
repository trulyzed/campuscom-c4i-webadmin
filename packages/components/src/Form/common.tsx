import React from "react"
import { Form, UploadProps } from "antd"
import { FormInstance, Rule, FormItemProps } from "antd/lib/form"
import { ValidateStatus } from "antd/lib/form/FormItem"
import { IQuery, IQueryParams } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { ValidateErrorEntity } from "rc-field-form/lib/interface"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { DefaultOptionType } from "antd/lib/select"

export const TEXT = "TEXT"
export const TEXTAREA = "TEXTAREA"
export const DROPDOWN = "DROPDOWN"
export const MULTI_SELECT_DROPDOWN = "MULTI_SELECT_DROPDOWN"
export const MULTI_RADIO = "MULTI_RADIO"
export const DATE_PICKER = "DATE_PICKER"
export const DATE_PICKERS = "DATE_PICKERS"
export const HIERARCHICAL_MULTIPLE_CHECKBOX = "HIERARCHICAL_MULTIPLE_CHECKBOX"
export const NUMBER = "NUMBER"
export const BOOLEAN = "BOOLEAN"
export const PASSWORD = "PASSWORD"
export const OTP = "OTP"
export const MULTI_SELECT_CHECKBOX = "MULTI_SELECT_CHECKBOX"
export const MULTI_SELECT_GROUP_CHECKBOX = "MULTI_SELECT_GROUP_CHECKBOX"
export const CUSTOM_FIELD = "CUSTOM_FIELD"
export const DISPLAY_FIELD = "DISPLAY_FIELD"
export const FILE = "FILE"
export const EDITOR = "EDITOR"

export type IFieldType =
  | typeof TEXT
  | typeof TEXTAREA
  | typeof DROPDOWN
  | typeof MULTI_SELECT_DROPDOWN
  | typeof DATE_PICKER
  | typeof DATE_PICKERS
  | typeof HIERARCHICAL_MULTIPLE_CHECKBOX
  | typeof NUMBER
  | typeof BOOLEAN
  | typeof PASSWORD
  | typeof OTP
  | typeof MULTI_SELECT_CHECKBOX
  | typeof MULTI_SELECT_GROUP_CHECKBOX
  | typeof CUSTOM_FIELD
  | typeof MULTI_RADIO
  | typeof FILE
  | typeof EDITOR
  | typeof DISPLAY_FIELD

export interface IField {
  label: React.ReactNode
  inputType: IFieldType
  sortOrder?: number
  hidden?: boolean
  placeholder?: string
  disabled?: boolean
  helpkey?: string
  fieldName: string
  initialValue?: any
  defaultValue?: any
  displayKey?: string
  valueKey?: string
  ariaLabel?: string
  previewKey?: string
  fieldName2?: string
  defaultValue2?: any
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string
  autoComplete?: string
  extraProps?: { [key: string]: any }
  options?: any[]
  refLookupService?: IQuery
  customFilterComponent?: React.FunctionComponent<any>
  rules?: Rule[]
  required?: boolean
  validateStatus?: ValidateStatus
  help?: string | React.ReactNode
  helperText?: string | React.ReactNode
  labelColSpan?: number
  wrapperColSpan?: number
  colSpan?: number
  maxLength?: number
  onSelectedItems?: (value: any, option?: DefaultOptionType | DefaultOptionType[], lookupData?: any[]) => void
  searchFieldName?: string
  formItemStyle?: React.CSSProperties
  maxValue?: number
  childrenKey?: string
  otpLength?: number
  multiple?: boolean
  accept?: UploadProps['accept']
  dependencies?: React.ComponentProps<typeof Form.Item>['dependencies']
  performInitialLookup?: boolean
  onDependencyChange?: (value: any, options: {
    toggleField?: (status: boolean) => void
    loadOptions?: (args?: IQueryParams, reset?: boolean) => Promise<any[]>
  }) => void | boolean
  excludeFromSubmission?: boolean
  autoSelectSingle?: boolean
  defaultPreferenceIndex?: string
  onAutoSelectDefault?: (...args: any) => void
  withApply?: boolean
  onApply?: (args: { value: any, setDisplayFieldValue?: (args: any) => void }) => void
  render?: (text: any) => React.ReactNode
}

export interface IGeneratedField extends Omit<IField, "inputType"> {
  formInstance: FormInstance
  clearTrigger?: boolean
  getValueFromEvent?: (...args: any) => void
  dependencyValue?: any
  updateMeta?: React.Dispatch<React.SetStateAction<IField[]>>
}

export function SearchFieldWrapper(props: IGeneratedField & { children?: React.ReactNode } & FormItemProps) {
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
      style={{ ...props.formItemStyle, ...props.withApply && { marginBottom: 0 } }}
      getValueFromEvent={props.getValueFromEvent}
      initialValue={props.initialValue}
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

export interface IValidationError { }
export const convertValidationErrorToErroMessage = (
  validation: ValidateErrorEntity<{ [key: string]: any }>
): ISimplifiedApiErrorMessage[] => {
  const errorMessages: ISimplifiedApiErrorMessage[] = validation.errorFields.map((x) => {
    return { message: x.errors[0], propertyName: x.name[0] as string }
  })
  if (errorMessages.length > 0 && errorMessages[0].propertyName) {
    setTimeout(() => {
      const errorMessages = document.getElementById("errorMessages")
      if (errorMessages) errorMessages.focus()
    }, 1 * 1000)
  }
  return errorMessages
}
