import { ComponentProps } from "react"
import { Tree } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'

interface IHierarchicalListProp {
  data: { [key: string]: any }[],
  fieldNames?: ComponentProps<typeof Tree>['fieldNames']
}

export const HierarchicalList = (props: IHierarchicalListProp) => {
  const {
    data,
    fieldNames
  } = props

  const treeProps: ComponentProps<typeof Tree> = {
    showLine: { showLeafIcon: false },
    defaultExpandAll: true,
    treeData: data,
    selectable: false,
    switcherIcon: <CaretDownOutlined />,
    fieldNames
  }

  return (
    <div style={{ border: "1px solid lightgray", padding: "5px" }}>
      <Tree {...treeProps} />
    </div>
  )
}