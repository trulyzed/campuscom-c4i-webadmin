import React from "react"
import { Descriptions, Typography } from "antd";
import { IGeneratedField } from "~/Form/common"
import { useDependencyValue } from "~/Hooks/useDependencyValue";

export function FormDisplayField(props: IGeneratedField) {
  useDependencyValue({ ...props })
  return (
    <Descriptions size="middle" column={1}>
      <Descriptions.Item label={<Typography.Text strong children={props.label} />} children={props.defaultValue} />
    </Descriptions>
  )
}
