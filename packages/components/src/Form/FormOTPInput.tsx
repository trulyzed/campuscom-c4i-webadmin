import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { useDependencyValue } from "~/Hooks/useDependencyValue"
import ReactOtpInput from 'react-otp-input'

export function FormOTPInput(props: IGeneratedField & { otpLength?: number }) {
  useDependencyValue({ ...props })
  return (
    <SearchFieldWrapper {...props}>
      <ReactOtpInput
        numInputs={props.otpLength}
        separator={<span>-</span>}
        inputStyle={'otp-field__input'}
      />
    </SearchFieldWrapper>
  )
}
