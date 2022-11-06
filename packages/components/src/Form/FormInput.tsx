import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { Input } from "antd"
import { useDependencyValue } from "~/Hooks/useDependencyValue";

export function FormInput(props: IGeneratedField & { readOnly?: boolean; type?: "text" | "password" }) {
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props}>
      <Input
        type={"text" || props.type}
        maxLength={props.maxLength}
        disabled={props.disabled}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        onChange={props.onSelectedItems}
        autoComplete={props.autoComplete}
      />
    </SearchFieldWrapper>
  )
}
