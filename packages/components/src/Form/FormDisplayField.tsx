import React from "react"
import { Col, Row } from "antd";
import { IGeneratedField } from "~/Form/common"
import { useDependencyValue } from "~/Hooks/useDependencyValue";

export function FormDisplayField(props: IGeneratedField) {
  useDependencyValue({ ...props })
  const value = props.render ? props.render(props.defaultValue) : props.defaultValue
  return (
    <div className="ant-form-item">
      <Row className="ant-form-item-row">
        <Col className="ant-form-item-label" span={props.labelColSpan}>
          <span className="labelize" children={props.label} />
        </Col>
        <Col className="ant-form-item-control" span={props.wrapperColSpan}>
          <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content">
              <span>{value}</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
