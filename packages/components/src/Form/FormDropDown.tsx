import React, { useCallback, useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { Select } from "antd"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { IQueryParams } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { useDependencyValue } from "~/Hooks/useDependencyValue"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { UPDATE_USER_PREFERENCE } from "~/Constants"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"

export function FormDropDown(
  props: IGeneratedField & {
    renderLabel?: (Params: { [key: string]: any }) => string
    allowClear?: boolean
    dropdownMatchSelectWidth?: boolean | number
  }
) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [lookupData, setLookupData] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { formInstance, fieldName, options: optionsProp, renderLabel, refLookupService, displayKey, valueKey, } = props
  const [userPreferences, setUserPreferences] = useState<IUser['preferences']>(getUser()?.preferences || {})

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
        setLookupData(x.data)
        x.data = x.data.map((y: any) => ({
          label: renderLabel ? renderLabel(y) : y[displayKey || "label"],
          value: y[valueKey || "value"]
        }))
        setOptions(x.data)
        return x.data
      } else if (x.success && Array.isArray(x.data)) {
        setLookupData(x.data)
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

  useEffect(() => {
    const name = `${UPDATE_USER_PREFERENCE}__${fieldName}`
    eventBus.subscribe(name, (data) => {
      setUserPreferences(data)
    })
    return () => eventBus.unsubscribe(name)
  }, [fieldName])

  useEffect(() => {
    if (!props.autoSelectSingle || options.length !== 1) return
    formInstance.setFieldValue(fieldName, options[0].value)
    props.onAutoSelectDefault?.(options[0].value)
    // eslint-disable-next-line
  }, [options, props.autoSelectSingle, formInstance.setFieldValue, fieldName])

  useEffect(() => {
    if (props.defaultValue !== undefined) return
    const value = options.find(o => o.value === userPreferences[props.defaultPreferenceIndex || '']?.id)?.value
    if (!value) return
    formInstance.setFieldValue(fieldName, value)
    props.onAutoSelectDefault?.(value)
    // eslint-disable-next-line
  }, [options, userPreferences, props.defaultValue, props.defaultPreferenceIndex, formInstance.setFieldValue, fieldName])

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
        onChange={(value, option) => props.onSelectedItems?.(value, option, lookupData)}
        dropdownMatchSelectWidth={props.dropdownMatchSelectWidth !== undefined ? props.dropdownMatchSelectWidth : true}
      >
        {options &&
          options.map(({ label, value }, i) => <Select.Option value={value} key={`${value}_${i}`} children={label} />)}
      </Select>
    </SearchFieldWrapper>
  )
}
