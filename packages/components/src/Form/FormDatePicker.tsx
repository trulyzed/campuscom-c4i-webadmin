import React, { useEffect } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { Datepicker } from "@salesforce/design-system-react"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { DATE_DISPLAY_FORMAT } from "~/Configs/format"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormDatePicker(props: IGeneratedField & { dateFormate?: string; hasStaticAlignment?: boolean }) {
  const firstRender = useFirstRender()
  useDependencyValue({ ...props })

  useEffect(() => {
    if (!firstRender) {
      props.formInstance.resetFields([`${props.fieldName}`])
    }
    // eslint-disable-next-line
  }, [props.clearTrigger])

  const getFormattedValue = (value: Date | string) => {
    return value ? moment(value).format(DATE_DISPLAY_FORMAT) : ''
  }

  return (
    <>
      <SearchFieldWrapper
        getValueFromEvent={(event: any, data: { date: Date, formattedDate: string }) => data.date}
        {...props}
      >
        <Datepicker
          className={'datepicker_component'}
          disabled={props.disabled}
          placeholder={props.placeholder}
          formatter={(date: Date) => {
            return getFormattedValue(date)
          }}
          parser={(dateString: string) => {
            return moment(dateString, DATE_DISPLAY_FORMAT).toDate();
          }}
          formattedValue={getFormattedValue(props.defaultValue)}
          relativeYearFrom={-25}
          relativeYearTo={25}
          hasStaticAlignment={!!props.hasStaticAlignment}
        />
      </SearchFieldWrapper>
    </>
  )
}
