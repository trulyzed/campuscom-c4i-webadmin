import { Tree } from "antd";

interface IHierarchicalListProp {
  data: { [key: string]: any }[],
}

export const HierarchicalList = (props: IHierarchicalListProp) => {
  const {
    data
  } = props

  const treeProps = {
    showLine: true,
    showIcon: false,
    showLeafIcon: false,
    defaultExpandAll: true,
    treeData: data,
    selectable: false,
  }

  return (
    <div>
      <Tree {...treeProps} />
    </div>
  )
}