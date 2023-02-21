import React, { CSSProperties, useCallback, useEffect, useState } from "react"
import { Button, Col, Form, Grid, Row } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import {
  IField,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT,
  BOOLEAN,
  CUSTOM_FIELD,
  MULTI_SELECT_CHECKBOX,
  TEXTAREA,
  MULTI_RADIO,
  FILE,
  EDITOR,
  MULTI_SELECT_GROUP_CHECKBOX,
  HIERARCHICAL_MULTIPLE_CHECKBOX,
  DISPLAY_FIELD,
  PASSWORD,
  OTP,
} from "~/Form/common"
import { FormInput } from "~/Form/FormInput"
// import { FormDropDown } from "~/Form/FormDropDown"
import { FormMultiSelectDropDown } from "~/Form/FormMultiSelectDropDown"
import { FormHierarchicalMultipleCheckbox } from "~/Form/FormHierarchicalMultipleCheckbox"
import { FormDatePicker } from "~/Form/FormDatePicker"
import { FormDatePickers } from "~/Form/FormDatePickers"
import { FormCheckbox } from "~/Form/FormCheckbox"
import { FormInstance } from "antd/lib/form"
import { FormMultipleCheckbox } from "~/Form/FormMultipleCheckbox"
import { FormMultipleRadio } from "~/Form/FormMultipleRadio"
import { FormTextArea } from "~/Form/FormTextArea"
import { FormPasswordInput } from "~/Form/FormPasswordInput"
import { FormInputNumber } from "~/Form/FormInputNumber"
import { FormFileUpload } from "~/Form/FormFileUpload"
import { FormEditorInput } from "~/Form/FormEditorInput"
import { FormGroupedMultipleCheckbox } from "~/Form/FormGroupedMultipleCheckbox"
import { FormHiddenInput } from "~/Form/FormHiddenInput"
import { FormDisplayField } from "~/Form/FormDisplayField"
import { FormOTPInput } from "~/Form/FormOTPInput"
// import { CustomCheckbox } from "~/Form/CustomCheckbox"
import { CustomCheckbox } from "./CustomCheckbox"
import { FormDropDown } from "./FormDropDown"

export const FormFields = (props: {
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess?: boolean
  isVertical?: boolean
  dependencyValue?: any
  updateMeta?: React.Dispatch<React.SetStateAction<IField[]>>
  handleValuesChange?: (...args: any) => void
  displayFieldValue?: Record<string, any>
  isFetchingQueryData?: boolean
  queryData?: any
  isModal?: boolean
  enableFormItemToggle?: boolean
  defaultFormItemToggleValue?: Record<IField['fieldName'], boolean>
  onSelectedItems?: (fieldName: IField['fieldName'], value: any, option?: DefaultOptionType | DefaultOptionType[]) => void
  onOptionDataChange?: (fieldName: IField['fieldName'], options: any[]) => void
  normalToggleLabel?: boolean
  onFormItemToggle?: (values: Record<string, boolean>) => void
  itemContainerStyle?: CSSProperties
}) => {
  const { onFormItemToggle } = props
  const breakpoint = Grid.useBreakpoint()
  const [displayFieldValue, setDisplayFieldValue] = useState<Record<string, any>>()
  const labelColSpan = props.isVertical ? 24 : 8
  const [showFields, setShowFields] = useState<Record<IField['fieldName'], boolean> | undefined>(props.defaultFormItemToggleValue)

  const handleShowField = useCallback((fieldName: IField['fieldName'], value: boolean) => {
    setShowFields(val => ({
      ...val,
      [fieldName]: value
    }))
    onFormItemToggle?.({ [fieldName]: value })
  }, [onFormItemToggle])

  useEffect(() => {
    setDisplayFieldValue((props.queryData || props.displayFieldValue) ? { ...props.queryData, ...props.displayFieldValue } : undefined)
  }, [props.displayFieldValue, props.queryData])

  return (
    <Row gutter={[16, props.enableFormItemToggle ? 4 : 0]} style={{ marginBottom: props.enableFormItemToggle ? 10 : 0 }}>
      {props.meta
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((i, idx) => {
          const field = { ...i } as IField
          let formField: any
          const togglerLabel: IField['label'] = i.label
          if (props.enableFormItemToggle) field.label = undefined
          if (!field.hidden) {
            switch (field.inputType) {
              case TEXT:
                formField = (
                  <FormInput
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case NUMBER:
                formField = (
                  <FormInputNumber
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case TEXTAREA:
                formField = (
                  <FormTextArea
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case BOOLEAN:
                formField = (
                  <FormCheckbox
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 20}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case PASSWORD:
                formField = (
                  <FormPasswordInput
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case OTP:
                formField = (
                  <FormOTPInput
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                    otpLength={field.otpLength}
                  />
                )
                break
              case MULTI_SELECT_CHECKBOX:
                formField = (
                  <FormMultipleCheckbox
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case MULTI_SELECT_GROUP_CHECKBOX:
                formField = (
                  <FormGroupedMultipleCheckbox
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || 4}
                    wrapperColSpan={field.wrapperColSpan || 20}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case MULTI_RADIO:
                formField = (
                  <FormMultipleRadio
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case DROPDOWN:
                formField = (
                  <FormDropDown
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                    autoSelectSingle={field.autoSelectSingle}
                    onAutoSelectDefault={(value) => props.handleValuesChange?.({ [field.fieldName]: value })}
                    onSelectedItems={(value, option) => props.onSelectedItems?.(field.fieldName, value, option)}
                    onOptionDataChange={(options) => props.onOptionDataChange?.(field.fieldName, options)}
                  />
                )
                break
              case MULTI_SELECT_DROPDOWN:
                formField = (
                  <FormMultiSelectDropDown
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case HIERARCHICAL_MULTIPLE_CHECKBOX:
                formField = (
                  <FormHierarchicalMultipleCheckbox
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    fieldNames={{ title: field.displayKey, key: field.valueKey, children: field.childrenKey }}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case DATE_PICKER:
                formField = (
                  <FormDatePicker
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case DATE_PICKERS:
                formField = (
                  <FormDatePickers
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case FILE:
                formField = (
                  <FormFileUpload
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case EDITOR:
                formField = (
                  <FormEditorInput
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || 4}
                    wrapperColSpan={field.wrapperColSpan || 20}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case CUSTOM_FIELD:
                if (field.customFilterComponent) {
                  formField = (
                    <Form.Item colon={false} label={field.label} labelCol={{ span: field.labelColSpan || 4 }} wrapperCol={{ span: field.wrapperColSpan || 20 }} style={field.formItemStyle}>
                      <field.customFilterComponent
                        {...{
                          ...field,
                          key: idx,
                          formInstance: props.formInstance,
                          clearTrigger: props.clearTrigger,
                          labelColSpan: field.labelColSpan || 8,
                          wrapperColSpan: field.wrapperColSpan || 24,
                          dependencyValue: props.dependencyValue[field.fieldName],
                          updateMeta: props.updateMeta,
                          loading: props.isFetchingQueryData
                        }}
                      />
                    </Form.Item>
                  )
                }
                break
              case DISPLAY_FIELD:
                formField = (
                  <FormDisplayField
                    {...field}
                    key={idx}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || 8}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    defaultValue={displayFieldValue?.[field.fieldName]}
                    loading={props.isFetchingQueryData}
                  />
                )
                break
              default:
                break
            }
          }

          const lg = field.colSpan || ((props.isVertical || (field.inputType === EDITOR) || (field.inputType === MULTI_SELECT_GROUP_CHECKBOX) || (field.inputType === CUSTOM_FIELD)) ? 24 : 12)
          const xs = 24

          return field.hidden ? (
            <FormHiddenInput
              {...field}
              key={idx}
              formInstance={props.formInstance}
              dependencyValue={props.dependencyValue[field.fieldName]}
              updateMeta={props.updateMeta}
            />
          )
            : formField ? (
              <Col key={1000 + idx} lg={lg} xs={xs} style={field.withApply ? { display: "flex" } : undefined} className={(props.isModal && field.inputType === DATE_PICKER) ? 'date_input--in-modal' : ''}>
                {props.enableFormItemToggle ?
                  <CustomCheckbox
                    fieldName={field.fieldName}
                    label={togglerLabel}
                    value={!!showFields?.[field.fieldName]}
                    onChange={(value) => handleShowField(field.fieldName, value)}
                    required={!!field.rules?.find((i: any) => i.required)}
                    showColon={false}
                    normalLabel={props.normalToggleLabel === undefined ? true : props.normalToggleLabel}
                  />
                  : null}
                {(!props.enableFormItemToggle || showFields?.[field.fieldName]) ?
                  <>
                    {field.withApply ? (
                      <div style={{ display: "flex", flex: 1, ...breakpoint.md ? undefined : { alignItems: "flex-end" }, marginBottom: "24px" }}>
                        {formField}
                        {field.withApply ? <Button onClick={() => field.onApply?.({ value: props.formInstance.getFieldValue(field.fieldName), setDisplayFieldValue })} children={"Apply"} /> : null}
                      </div>
                    ) : <div style={{ ...props.itemContainerStyle }}>{formField}</div>}
                    {field.helperText ?
                      <div style={{ marginBottom: "10px", ...props.isVertical ? undefined : { textAlign: "right", marginTop: "-10px" } }}>
                        {typeof field.helperText === "string" ? <span>{field.helperText}</span> : field.helperText}
                      </div>
                      : null
                    }
                  </> : null
                }
              </Col>
            ) : undefined
        })}
    </Row>
  )
}