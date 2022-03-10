import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Input } from "antd"

export function FormInput(props: IGeneratedField & { readOnly?: boolean; type?: "text" | "password" }) {
  return (
    <SearchFieldWrapper {...props}>
      <Input
        type={"text" || props.type}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        onChange={props.onSelectedItems}
        autoComplete="off"
      />
    </SearchFieldWrapper>
  )
}
