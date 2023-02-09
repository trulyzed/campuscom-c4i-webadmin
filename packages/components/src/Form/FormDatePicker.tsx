import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { DatePicker, Form, Input } from "antd"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { HELPER_FIELD_PATTERN } from "./MetaDrivenForm"
import { DATE_DISPLAY_FORMAT, DATE_TIME_PAYLOAD_FORMAT } from "~/Configs/format"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormDatePicker(props: IGeneratedField & { dateFormate?: string }) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useDependencyValue({ ...props })
  const [isOpened, setIsOpened] = useState(false)
  const [showHelpText, setShowHelpText] = useState(false)

  useEffect(() => {
    const handleF1Press = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault()
        setShowHelpText(true)
      }
    }
    const handleReset = () => {
      document.removeEventListener('keydown', handleF1Press)
      setShowHelpText(false)
    }
    if (isOpened) document.addEventListener('keydown', handleF1Press)
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
            const formattedDate = date?.format(props.dateFormate || DATE_TIME_PAYLOAD_FORMAT)
            props.formInstance.setFieldsValue({
              [props.fieldName]: formattedDate
            })
            setValue(date)
            props.onSelectedItems && props.onSelectedItems(formattedDate)
          }}
          format={DATE_DISPLAY_FORMAT}
          style={{ width: "100%", }}
          nextIcon={<span aria-label="next month">&gt;</span>}
          superNextIcon={<span aria-label="next year">&gt;&gt;</span>}
          prevIcon={<span aria-label="previous month">&lt;</span>}
          superPrevIcon={<span aria-label="previous year">&lt;&lt;</span>}
          onOpenChange={setIsOpened}
          showToday={false}
          renderExtraFooter={() => (
            <div role={"alert"}>
              <p style={{ marginTop: 10, lineHeight: "20px", color: "#333333" }}>
                {showHelpText ? <span>Press the arrow keys to navigate by day, PageUp and PageDown to navigate by month, Ctrl+RightArrow and Ctrl+LeftArrow to navigate by year, or Escape to cancel.</span>
                  : <span>Press F1 for help.</span>}
              </p>
            </div>
          )}
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