import React, { useCallback, useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Select } from "antd"
import { eventBus } from "~/packages/utils/EventBus"
import { IQueryParams } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { useDependencyValue } from "~/packages/components/Hooks/useDependencyValue"

export function FormDropDown(
  props: IGeneratedField & {
    renderLabel?: (Params: { [key: string]: any }) => string
    allowClear?: boolean
    dropdownMatchSelectWidth?: boolean | number
  }
) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { formInstance, fieldName, options: optionsProp, renderLabel, refLookupService, displayKey, valueKey, } = props

  const loadOptions = useCallback(async (params?: IQueryParams): Promise<any[]> => {
    setOptions([])
    formInstance.setFieldsValue({ [fieldName]: undefined })
    if (optionsProp && optionsProp.length) {
      const adjustedOptions = optionsProp.map((x) => {
        return {
          label: x["label"],
          value: x["value"]
        }
      })
      setOptions(adjustedOptions)
      return adjustedOptions
    } else if (refLookupService) {
      setLoading(true)
      const x = await refLookupService(params)
      setLoading(false)
      if (x.success && displayKey && valueKey) {
        x.data = x.data.map((y: any) => ({
          label: renderLabel ? renderLabel(y) : y[displayKey || "label"],
          value: y[valueKey || "value"]
        }))
        setOptions(x.data)
        return x.data
      } else if (x.success && Array.isArray(x.data)) {
        x.data = x.data.map((y: any) => ({
          label: renderLabel ? renderLabel(y) : y,
          value: y
        }))
        setOptions(x.data)
        return x.data
      }
    }
    return []
  }, [formInstance, optionsProp, renderLabel, displayKey, refLookupService, valueKey, fieldName])

  useDependencyValue({ ...props, loadOptions, setOptions })

  useEffect(() => {
    if ((!props.dependencies || props.dependencyValue !== undefined) || props.performInitialLookup) loadOptions()
    const eventName = `REFRESH_SEARCH_DROPDOWN_${(refLookupService || new Date().getTime())?.toString() + displayKey + valueKey + props.fieldName
      }`
    eventBus.subscribe(eventName, loadOptions)
    return () => {
      eventBus.unsubscribe(eventName)
      props.formInstance.resetFields([props.fieldName])
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (
      !(
        (Array.isArray(props.defaultValue) && props.defaultValue.length === 0) ||
        props.defaultValue === undefined ||
        props.defaultValue === null ||
        props.defaultValue === "null"
      )
    ) {
      props.formInstance.setFieldsValue({
        [props.fieldName]: props.defaultValue
      })
    } else {
      setTimeout(() => {
        const input = document.getElementById(props.fieldName)
        if (input) {
          input.removeAttribute("aria-activedescendant")
        }
      }, 0)
    }

    // eslint-disable-next-line
  }, [props.defaultValue])

  return (
    <SearchFieldWrapper {...props}>
      <Select
        showSearch
        aria-expanded={isOpen ? "true" : "false"}
        placeholder={props.placeholder}
        onDropdownVisibleChange={(open: boolean) => setIsOpen(open)}
        allowClear={props.allowClear === undefined ? true : props.allowClear}
        loading={loading}
        filterOption={(inputValue, options) => {
          return !!(
            options &&
            typeof options.children === "string" &&
            (options.children as string).toLowerCase().includes(inputValue.toLowerCase())
          )
        }}
        disabled={props.disabled}
        onChange={props.onSelectedItems}
        dropdownMatchSelectWidth={props.dropdownMatchSelectWidth !== undefined ? props.dropdownMatchSelectWidth : true}
      >
        {options &&
          options.map(({ label, value }, i) => <Select.Option value={value} key={`${value}_${i}`} children={label} />)}
      </Select>
    </SearchFieldWrapper>
  )
}
