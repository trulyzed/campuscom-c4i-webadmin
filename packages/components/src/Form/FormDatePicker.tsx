import React, { useCallback, useEffect, useRef, useState } from "react"
import moment, { Moment } from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { DatePicker, Form, Input, InputRef } from "antd"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { HELPER_FIELD_PATTERN } from "./MetaDrivenForm"
import { DATE_DISPLAY_FORMAT, DATE_TIME_PAYLOAD_FORMAT } from "~/Configs/format"
import { useDependencyValue } from "~/Hooks/useDependencyValue"
import { ContextAction } from "~/Actions/ContextAction"

const controlKeys = ['Enter', 'Backspace', 'Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'Control', 'Shift', 'Home', 'End']

export function FormDatePicker(props: IGeneratedField & { dateFormate?: string }) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<Moment | undefined>(undefined)
  useDependencyValue({ ...props })
  const [isOpened, setIsOpened] = useState(false)
  const [showHelpText, setShowHelpText] = useState(false)
  const ref = useRef(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  const helperFieldName = `${HELPER_FIELD_PATTERN}${props.fieldName}`
  const containerID = `${helperFieldName}$$action-container`
  const helpIsRead = useRef(false)

  const handleChange = useCallback((date) => {
    const formattedDate = date?.format(props.dateFormate || DATE_TIME_PAYLOAD_FORMAT)
    props.formInstance.setFieldsValue({
      [props.fieldName]: formattedDate,
      [helperFieldName]: date
    })
    setValue(date || undefined)
    props.onSelectedItems && props.onSelectedItems(formattedDate)
    // eslint-disable-next-line
  }, [helperFieldName, props.dateFormate, props.formInstance.setFieldsValue, props.fieldName, props.onSelectedItems])

  const handleKeyDown = useCallback((e) => {
    const isValidInput = e.key === '/' || e.key === '0' || Number(e.key)
    const newValue = isValidInput ? `${e.currentTarget.value}${e.key}` : ''
    if ((!controlKeys.includes(e.key) && (!newValue || newValue.length > 10))) {
      e.preventDefault()
    }
    if (e.key === 'Escape' && !e.currentTarget.value) handleChange(value)
  }, [handleChange, value])

  const handleClear = useCallback(() => {
    props.formInstance.resetFields([props.fieldName, helperFieldName])
    setValue(undefined)
    setTimeout(() => {
      if (ref.current) (ref.current as InputRef).focus()
    }, 0)
  }, [props.formInstance, props.fieldName, helperFieldName])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault()
        setShowHelpText(true)
      }
    }
    const handleReset = () => {
      document.removeEventListener('keydown', handleKeyPress)
      setShowHelpText(false)
      helpIsRead.current = false
    }
    if (isOpened) document.addEventListener('keydown', handleKeyPress)
    else handleReset()
    return () => handleReset()
  }, [isOpened])

  useEffect(() => {
    const date = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (date) {
      const t1 = moment(date)
      setValue(t1)
      props.formInstance.setFieldsValue({
        [props.fieldName]: t1.format(props.dateFormate || DATE_TIME_PAYLOAD_FORMAT)
      })
      props.formInstance.setFieldsValue({ [helperFieldName]: t1 })
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  useEffect(() => {
    !firstRender && setValue(undefined)
    // eslint-disable-next-line
  }, [props.clearTrigger])

  useEffect(() => {
    if (isOpened) helpIsRead.current = true
  }, [isOpened])

  useEffect(() => {
    if (value) actionRef.current?.focus()
  }, [value])

  return (
    <>
      <Form.Item colon={false} style={{ display: "none" }} name={props.fieldName}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName={helperFieldName}>
        {/* {value && ( */}
        <div id={containerID} style={{ display: 'flex', alignItems: 'center' }}>
          <DatePicker
            ref={ref}
            id={helperFieldName}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            disabled={props.disabled}
            placeholder={props.placeholder || DATE_DISPLAY_FORMAT}
            value={value}
            onChange={handleChange}
            format={DATE_DISPLAY_FORMAT}
            style={{ width: "100%", }}
            onKeyDown={handleKeyDown}
            nextIcon={<span aria-label="next month">&gt;</span>}
            superNextIcon={<span aria-label="next year">&gt;&gt;</span>}
            prevIcon={<span aria-label="previous month">&lt;</span>}
            superPrevIcon={<span aria-label="previous year">&lt;&lt;</span>}
            onOpenChange={setIsOpened}
            showToday={false}
            renderExtraFooter={() => (
              <p role={(!helpIsRead.current && isOpened) ? "alert" : undefined} style={{ marginTop: 10, lineHeight: "20px", color: "#333333" }}>
                {showHelpText ? <span>Press the arrow keys to navigate by day, PageUp and PageDown to navigate by month, Ctrl+RightArrow and Ctrl+LeftArrow to navigate by year, or Escape to cancel.</span>
                  : <span>Press F1 for help.</span>}
              </p>
            )}
            allowClear={false}
            onBlur={() => handleChange(value)}
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
          {value ?
            <ContextAction ref={actionRef} tooltip={`Clear ${props.label}, ${value.format(DATE_DISPLAY_FORMAT)}`} type="remove" buttonType="ghost" onClick={handleClear} />
            : null}
        </div>
      </SearchFieldWrapper>
    </>
  )
}