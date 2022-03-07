import React from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/packages/components/Form/common"
import { Checkbox as AntCheckbox } from "antd"

export function FormCheckbox(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props} extraProps={{ valuePropName: "checked" }}>
      <AntCheckbox disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}
