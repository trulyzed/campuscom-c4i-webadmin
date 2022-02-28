import React, { useEffect, useState } from "react"
import { SortableContainer as sortableContainer, SortableElement as sortableElement, SortableHandle as sortableHandle, SortEnd } from "react-sortable-hoc"
import { arrayMoveImmutable as arrayMove } from "array-move"
import { Checkbox, Form, Input, Typography } from "antd"
import { FormInstance } from "antd/lib/form"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"

export const VisibleColumns = (props: { visibleColumns: any[]; setVisibleColumns: (items: any[]) => void; formInstance: FormInstance }) => {
  // const [initialValues, setInitialValues] = useState<{ [key: string]: any }>({})
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

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

  const DragHandle = sortableHandle(() => <div style={{ width: "20px", cursor: "pointer" }}>::</div>)
  const SortableItem = sortableElement((props: any) => {
    return (
      <li>
        <div
          style={{
            margin: "5px",
            display: "flex",
            flexFlow: "row",
            padding: "10px"
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
              <Input value={props.value.title as string} onChange={(e) => console.log(e)} />
            </Form.Item>
          </div>
        </div>
      </li>
    )
  })
  const SortableContainer = sortableContainer((props: { children: React.ReactNode }) => {
    return <ol>{props.children}</ol>
  })
  return (
    <div
      {...(!mobileView && {
        style: { overflowY: "scroll", maxHeight: "60vh" }
      })}
    >
      <Typography.Title level={3}>Active Columns</Typography.Title>
      <SortableContainer
        axis="y"
        onSortEnd={(sort: SortEnd) => {
          if (sort.oldIndex !== sort.newIndex) {
            props.setVisibleColumns(arrayMove([...props.visibleColumns], sort.oldIndex, sort.newIndex))
          }
        }}
        useDragHandle={true}
      >
        <Form form={props.formInstance}>
          {props.visibleColumns
            .filter((x) => !!x.dataIndex)
            .map((item: any, index: number) => {
              item.hidden = item.hidden !== undefined ? item.hidden : false
              item.index = index
              return <SortableItem key={`item-${index}`} index={index} value={item} />
            })}
        </Form>
      </SortableContainer>
    </div>
  )
}
