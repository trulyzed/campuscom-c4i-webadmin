import React from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { Checkbox as AntCheckbox } from "antd"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormCheckbox(props: IGeneratedField) {
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props} extraProps={{ valuePropName: "checked" }}>
      <AntCheckbox disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}
