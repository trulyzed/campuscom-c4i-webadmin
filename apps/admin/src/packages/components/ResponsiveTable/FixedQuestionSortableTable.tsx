import React from "react"
import { Table } from "antd"
import { SortableContainer as sortableContainer, SortableElement as sortableElement, SortEnd } from "react-sortable-hoc"
import { arrayMoveImmutable as arrayMove } from "array-move"

const SortableItem = sortableElement((props: any) => <tr {...props} />)
const SortableContainer = sortableContainer((props: any) => <tbody {...props} />)

type TypeSortableTable = {
  dataSource: Array<any>
  rowSelection?: any
  columns: Array<any>
  updatedList: (Params: Array<any>) => void
  style?: React.CSSProperties
  pagination?: boolean
  rowKey: string
  loading?: boolean
}

export class FixedQuestionSortableTable extends React.Component<TypeSortableTable> {
  state = {
    updatedList: this.props.updatedList
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      this.props.updatedList(
        arrayMove([...this.props.dataSource], oldIndex, newIndex)
          .filter((el) => !!el)
          .map((x, i) => {
            x.SortPosition = i + 1
            return x
          })
      )
    }
  }

  DraggableBodyRow = ({ ...restProps }: any) => {
    const index = this.props.dataSource.findIndex((x) => x.index === restProps["data-row-key"])
    return <SortableItem index={index} {...restProps} />
  }

  render() {
    const DraggableContainer = (props: any) => (
      <SortableContainer useDragHandle helperClass="row-dragging" onSortEnd={this.onSortEnd} {...props} />
    )
    return (
      <Table
        style={this.props.style}
        loading={this.props.loading}
        pagination={false}
        dataSource={this.props.dataSource}
        columns={this.props.columns}
        {...(this.props.rowSelection && { rowSelection: { type: "radio", ...this.props.rowSelection } })}
        rowKey={this.props.rowKey}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: this.DraggableBodyRow
          }
        }}
      />
    )
  }
}
