import React, { useCallback, useEffect, useMemo } from "react"
import { FormInstance } from "antd"
import moment, { Moment } from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { Datepicker } from "@salesforce/design-system-react"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { DATE_DISPLAY_FORMAT } from "~/Configs/format"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

interface IMyDatePickerProps {
  fieldName: string
  formInstance: FormInstance
  onChange?: (value?: Date) => void
  disabled?: boolean
  placeholder?: string
  relativeYearFrom?: number
  relativeYearTo?: number
  hasStaticAlignment?: boolean
}

export function FormDatePicker(props: IGeneratedField & Pick<IMyDatePickerProps, 'relativeYearFrom' | 'relativeYearTo' | 'hasStaticAlignment'>) {
  const firstRender = useFirstRender()
  useDependencyValue({ ...props })

  useEffect(() => {
    if (!firstRender) {
      props.formInstance.resetFields([`${props.fieldName}`])
    }
    // eslint-disable-next-line
  }, [props.clearTrigger])

  return (
    <>
      <SearchFieldWrapper
        {...props}
      >
        <MyDatePicker
          fieldName={props.fieldName}
          formInstance={props.formInstance}
          placeholder={props.placeholder}
          disabled={props.disabled}
          hasStaticAlignment={props.hasStaticAlignment}
          relativeYearFrom={props.relativeYearFrom}
          relativeYearTo={props.relativeYearTo}
        />
      </SearchFieldWrapper>
    </>
  )
}

const MyDatePicker = ({
  placeholder,
  disabled,
  onChange,
  fieldName,
  formInstance,
  relativeYearFrom = -123,
  relativeYearTo = 50,
  hasStaticAlignment,
}: IMyDatePickerProps) => {
  const getFormatedValue = useCallback((value: Date | string) => {
    return value ? moment(value).format(DATE_DISPLAY_FORMAT) : ''
  }, [])
  const { getFieldValue, setFieldValue } = formInstance
  const defaultFormatedValue = useMemo(() => {
    const value = getFieldValue(fieldName)
    if (value) return getFormatedValue(value)
    else return undefined
  }, [getFieldValue, getFormatedValue, fieldName])

  useEffect(() => {
    setFieldValue(fieldName, moment(defaultFormatedValue, DATE_DISPLAY_FORMAT).toDate())
  }, [fieldName, defaultFormatedValue, setFieldValue])

  const handleChange = useCallback((date: Moment) => {
    const now = moment()
    const newDate = date.toDate()
    const previousDate = getFieldValue(fieldName) as Date | undefined
    if (previousDate?.getTime() === newDate.getTime()) return

    if (date.isValid() &&
      (date.year() >= (now.year() - Math.abs(relativeYearFrom))) &&
      (date.year() < (now.year() + relativeYearTo))) {
      onChange?.(newDate)
    } else onChange?.(undefined)
  }, [relativeYearFrom, relativeYearTo, getFieldValue, fieldName, onChange])

  return (
    <Datepicker
      className={'datepicker_component'}
      disabled={disabled}
      placeholder={placeholder}
      formatter={(date: Date) => {
        if (date) handleChange(moment(date))
        return getFormatedValue(date)
      }}
      parser={(dateString: string) => {
        const momentDate = moment(dateString, DATE_DISPLAY_FORMAT)
        handleChange(momentDate)
        return momentDate.toDate()
      }}
      relativeYearFrom={relativeYearFrom}
      relativeYearTo={relativeYearTo}
      hasStaticAlignment={!!hasStaticAlignment}
      formattedValue={defaultFormatedValue}
    />
  )
}
