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
  }

  return (
    <div>
      <Tree
        showLine={treeProps.showLine}
        showIcon={treeProps.showIcon}
        defaultExpandedKeys={[]}
        treeData={data}
      />
    </div>
  )
}