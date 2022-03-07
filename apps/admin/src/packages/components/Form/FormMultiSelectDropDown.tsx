import React, { useEffect, useState } from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/packages/components/Form/common"
import { Select } from "antd"

export function FormMultiSelectDropDown(props: IGeneratedField & { onSelectedItems?: (params: any) => void }) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { refLookupService, displayKey, valueKey } = props
  useEffect(() => {
    if (props.options?.length) {
      setOptions(
        props.options?.map((x) => {
          return {
            label: x[displayKey || "label"],
            value: x[valueKey || "value"]
          }
        })
      )
    } else if (refLookupService) {
      setLoading(true)
      refLookupService().then((x) => {
        if (x.success && displayKey && valueKey) {
          x.data = x.data.map((y: any) => ({
            label: y[displayKey || "label"],
            value: y[valueKey || "value"]
          }))
          setOptions(x.data)
        }
        setLoading(false)
      })
    }
  }, [refLookupService, displayKey, valueKey, props.options])

  return (
    <SearchFieldWrapper {...props}>
      <Select
        mode="multiple"
        allowClear={true}
        loading={loading}
        disabled={props.disabled}
        onChange={props.onSelectedItems}
      >
        {options &&
          options.map(({ label, value }, i) => (
            <Select.Option value={value} key={`${value}_${i}`}>
              {label}
            </Select.Option>
          ))}
      </Select>
    </SearchFieldWrapper>
  )
}
