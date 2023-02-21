import { cloneElement, ReactElement } from "react";
import { FormInstance } from "antd";
import { IFormValueMeta } from "./MetaDrivenForm";

export const FormExtraActions = (props: { actions: ReactElement[]; formInstance: FormInstance; formValueMeta: IFormValueMeta }) => {
  return (
    <>
      {props.actions?.map((i, idx) => (
        cloneElement(i, {
          key: idx,
          formInstance: props.formInstance,
          formValueMeta: props.formValueMeta
        })
      ))}
    </>
  )
}