import React from "react"
import Form, { FormInstance } from "antd/lib/form"
import { Checkbox, Col, Row, Typography } from "antd"

export const HiddenColumns = (props: { hiddenColumns: any[]; formInstance: FormInstance }) => {
  return (
    <>
      <Typography.Title level={3}>Inactive Columns</Typography.Title>
      <Form form={props.formInstance}>
        <Row>
          {props.hiddenColumns.map((col, index) => (
            <Col xs={12} sm={12} md={8} key={index}>
              <Form.Item colon={false} style={{ marginBottom: "0px" }} name={col.dataIndex + "__checkbox"} valuePropName="checked">
                <Checkbox>{col.title}</Checkbox>
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </>
  )
}
