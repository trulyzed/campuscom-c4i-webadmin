import React from "react"
import { Tree } from "antd";

interface IDetailsHierarchialListProp {
  data: { [key: string]: any }[],
}

export default function HierarchialList(props: IDetailsHierarchialListProp) {

  const {
    data
  } = props

  const treeProps = {
    showLine: true,
    showIcon: false,
    showLeafIcon: false,
    defaultExpandAll: true,
    treeData: data,
    fieldNames: { key: 'key', children: 'submenu', title: 'title' }
  }

  return (
    <div>
      <Tree {...treeProps} />
    </div>
  )
}