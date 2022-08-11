import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Input } from "antd"
import { useDependencyValue } from "~/packages/components/Hooks/useDependencyValue";

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
        autoComplete="off"
      />
    </SearchFieldWrapper>
  )
}
