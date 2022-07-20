import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Input } from "antd"
import { useDependencyValue } from "~/packages/components/Hooks/useDependencyValue";

export function FormTextArea(props: IGeneratedField & { cols?: number; rows?: number }) {
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props}>
      <Input.TextArea
        aria-label={props.ariaLabel}
        maxLength={props.maxLength}
        disabled={props.disabled}
        cols={props.cols}
        rows={props.rows}
      />
    </SearchFieldWrapper>
  )
}
