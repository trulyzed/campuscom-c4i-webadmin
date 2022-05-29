import { ComponentProps } from "react"
import { Tree } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'

interface IHierarchicalListProp {
  data: { [key: string]: any }[],
}

export const HierarchicalList = (props: IHierarchicalListProp) => {
  const {
    data
  } = props

  const treeProps: ComponentProps<typeof Tree> = {
    showLine: { showLeafIcon: false },
    defaultExpandAll: true,
    treeData: data,
    selectable: false,
    switcherIcon: <CaretDownOutlined />,
  }

  return (
    <div style={{ border: "1px solid lightgray", padding: "5px" }}>
      <Tree {...treeProps} />
    </div>
  )
}