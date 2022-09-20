import React, { useEffect } from "react"
import { SortableContainer as sortableContainer, SortableElement as sortableElement, SortableHandle as sortableHandle, SortEnd } from "react-sortable-hoc"
import { arrayMoveImmutable as arrayMove } from "array-move"
import { Card, Checkbox, Col, Form, Input, Row, Typography, Grid } from "antd"
import { FormInstance } from "antd/lib/form"
import { IconButton } from "~/Form/Buttons/IconButton"

export const VisibleColumns = (props: { visibleColumns: any[]; setVisibleColumns: (items: any[]) => void; formInstance: FormInstance; updateVisibleColumns: () => void; }) => {
  // const [initialValues, setInitialValues] = useState<{ [key: string]: any }>({})
  const breakpoint = Grid.useBreakpoint()

  useEffect(() => {
    let _initialValues: { [key: string]: any } = {}
    props.visibleColumns.forEach((x) => {
      _initialValues = {
        ..._initialValues,
        [x.dataIndex + "__input"]: x.title
      }
      props.formInstance.setFieldsValue(_initialValues)
    })
    // setInitialValues(_initialValues)
    // eslint-disable-next-line
  }, [props.visibleColumns])

  const DragHandle = sortableHandle(() => <div style={{ width: "20px", cursor: "pointer", textAlign: "center" }} title={"Drag up or down to change the display order"}>::</div>)
  const SortableItem = sortableElement((props: any) => {
    return (
      <li>
        <div
          style={{
            margin: "5px",
            display: "flex",
            flexFlow: "row",
            padding: "10px",
            gap: "10px"
          }}
        >
          <DragHandle />
          <div style={{ width: "20px" }}>
            <Form.Item colon={false} style={{ marginBottom: "0px" }} name={props.value.dataIndex + "__checkbox"} valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </div>
          <div style={{ width: "200px" }}>
            <Form.Item colon={false} style={{ marginBottom: "0px" }} name={props.value.dataIndex + "__input"}>
              <Input />
            </Form.Item>
          </div>
        </div>
      </li>
    )
  })
  const SortableContainer = sortableContainer((props: { children: React.ReactNode }) => {
    return <ol style={{ paddingLeft: 0, marginBottom: 0 }}>{props.children}</ol>
  })
  return (
    <Card
      bordered
      title={
        <Row>
          <Col flex={"auto"}>
            <Typography.Title level={3} style={{ fontSize: "20px" }}>Active Columns</Typography.Title>
          </Col>
          {props.visibleColumns.length ?
            <Col xs={4} style={{ textAlign: "right" }}>
              <IconButton
                toolTip="Deactivate selected columns"
                iconType={breakpoint.md ? "right" : "down"}
                onClick={props.updateVisibleColumns}
                buttonType={"default"}
              />
            </Col>
            : null}
        </Row>
      }
    >
      <div
        {...(breakpoint.md && {
          style: { overflowY: "auto", maxHeight: "65vh" }
        })}
      >
        <SortableContainer
          axis="y"
          onSortEnd={(sort: SortEnd) => {
            if (sort.oldIndex !== sort.newIndex) {
              props.setVisibleColumns(arrayMove([...props.visibleColumns], sort.oldIndex, sort.newIndex))
            }
          }}
          useDragHandle={true}
        >
          <Form form={props.formInstance} initialValues={props.visibleColumns.reduce((a, c) => {
            a[`${c.dataIndex}__input`] = c.title
            return a
          }, {})}>
            {props.visibleColumns
              .filter((x) => !!x.dataIndex)
              .map((item: any, index: number) => {
                item.hidden = item.hidden !== undefined ? item.hidden : false
                item.index = index
                return <SortableItem key={`item-${index}`} index={index} value={item} />
              })}
          </Form>
        </SortableContainer>
        {!props.visibleColumns.length ?
          <Typography.Text type="secondary" children="No active columns" />
          : null}
      </div>
    </Card>
  )
}
