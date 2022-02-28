import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { Input } from "antd"

export function FormTextArea(props: IGeneratedField & { cols?: number; rows?: number }) {
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
