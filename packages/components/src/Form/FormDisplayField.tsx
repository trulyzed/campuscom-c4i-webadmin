import React from "react"
import { Descriptions, Typography } from "antd";
import { IGeneratedField } from "~/Form/common"
import { useDependencyValue } from "~/Hooks/useDependencyValue";

export function FormDisplayField(props: IGeneratedField) {
  useDependencyValue({ ...props })
  const value = props.render ? props.render(props.defaultValue) : props.defaultValue
  return (
    <Descriptions size="middle" column={1}>
      <Descriptions.Item label={<Typography.Text strong children={props.label} />} children={value} />
    </Descriptions>
  )
}
