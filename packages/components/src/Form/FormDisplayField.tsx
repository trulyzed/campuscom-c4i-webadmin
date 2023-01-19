import React from "react"
import { Col, Row, Spin } from "antd";
import { IGeneratedField } from "~/Form/common"
import { useDependencyValue } from "~/Hooks/useDependencyValue";
import { LoadingOutlined } from '@ant-design/icons';

export function FormDisplayField(props: IGeneratedField & { loading?: boolean }) {
  useDependencyValue({ ...props })
  return (
    <div className="ant-form-item">
      <Row className="ant-form-item-row">
        <Col className="ant-form-item-label" span={props.labelColSpan}>
          <span className="labelize" children={props.label} />
        </Col>
        <Col className="ant-form-item-control" span={props.wrapperColSpan}>
          <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content">
              {props.loading ?
                <Spin indicator={<LoadingOutlined />} />
                : props.render ?
                  props.render(props.defaultValue)
                  : <span>{props.defaultValue}</span>
              }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
