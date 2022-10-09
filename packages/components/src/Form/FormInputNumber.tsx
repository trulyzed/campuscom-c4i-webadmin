import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { InputNumber } from "antd"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormInputNumber(
  props: IGeneratedField & {
    formatter?: (value: any) => string
    parser?: (value: any) => string
  }
) {
  // const maxLengthAndNegativeCheck = (object: any) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //     object.target.value = object.target.value.slice(0, object.target.maxLength)
  //   }
  //   if (object.target.value.length < 1) {
  //     object.target.value = 0
  //   }
  // }
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props}>
      <InputNumber
        maxLength={props.maxLength}
        style={{ width: "100%", textAlign: "right" }}
        max={props.maxValue ? props.maxValue : 999999}
        min={0}
        // {...(props.formatter && { formatter: props.formatter })}
        // {...(props.parser && { parser: props.parser })}
        disabled={props.disabled}
      // onInput={maxLengthAndNegativeCheck}
      />
    </SearchFieldWrapper>
  )
}
