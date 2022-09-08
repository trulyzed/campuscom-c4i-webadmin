import React from "react"
import Form, { FormInstance } from "antd/lib/form"
import { Checkbox, Col, Row, Typography, Card, Grid } from "antd"
import { IconButton } from "~/Form/Buttons/IconButton";

export const HiddenColumns = (props: { hiddenColumns: any[]; formInstance: FormInstance; updateHiddenColumns: () => void; }) => {
  const breakpoint = Grid.useBreakpoint()
  return (
    <Card
      title={
        <Row>
          <Col flex={"auto"}>
            <Typography.Title level={3} type={"warning"} style={{ fontSize: "20px" }}>Inactive Columns</Typography.Title>
          </Col>
          {props.hiddenColumns.length ?
            <Col xs={4} style={{ textAlign: "right" }}>
              <IconButton
                toolTip="Activate selected columns"
                iconType={breakpoint.md ? "leftCircle" : "up"}
                onClick={props.updateHiddenColumns}
              />
            </Col>
            : null}
        </Row>
      }
    >
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
      {!props.hiddenColumns.length ?
        <Typography.Text type="secondary" children={"No inactive columns"} />
        : null}
    </Card>
  )
}
