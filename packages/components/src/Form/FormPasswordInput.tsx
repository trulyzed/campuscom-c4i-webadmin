import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { Input } from "antd"
import { useDependencyValue } from "~/Hooks/useDependencyValue";

export function FormPasswordInput(props: IGeneratedField & { readOnly?: boolean }) {
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props}>
      <Input.Password
        maxLength={props.maxLength}
        disabled={props.disabled}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        onChange={props.onSelectedItems}
      />
    </SearchFieldWrapper>
  )
}
