import React from "react"
import Form, { FormInstance } from "antd/lib/form"
import { Checkbox, Col, Row, Typography, Card, Grid, Input } from "antd"
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
                buttonType={"default"}
              />
            </Col>
            : null}
        </Row>
      }
    >
      <Form form={props.formInstance}>
        {props.hiddenColumns.map((col, index) => (
          <div key={index} style={{
            margin: "5px",
            display: "flex",
            flexFlow: "row",
            padding: "10px",
            gap: "10px"
          }}>
            <div style={{ width: "20px" }}>
              <Form.Item colon={false} style={{ marginBottom: "0px" }} name={col.dataIndex + "__checkbox"} valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </div>
            <div style={{ width: "200px" }}>
              <Input readOnly disabled defaultValue={col.title} />
            </div>
          </div>
        ))}
      </Form>
      {!props.hiddenColumns.length ?
        <Typography.Text type="secondary" children={"No inactive columns"} />
        : null}
    </Card>
  )
}
