import { useState, useEffect, ComponentProps } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Tree } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'
import { useDependencyValue } from "~/packages/components/Hooks/useDependencyValue"

export function FormHierarchicalMultipleCheckbox(props: IGeneratedField & { fieldNames?: ComponentProps<typeof Tree>['fieldNames'] }) {
  const [checkedKeys, setCheckedKeys] = useState(props.defaultValue)
  const { formInstance, fieldName, fieldNames } = props
  useDependencyValue({ ...props })

  useEffect(() => {
    if (fieldName && formInstance && checkedKeys)
      formInstance.setFieldsValue({
        [fieldName]: checkedKeys
      })
    // eslint-disable-next-line
  }, [checkedKeys])

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const treeProps: ComponentProps<typeof Tree> = {
    treeData: props.options,
    checkedKeys: checkedKeys,
    checkable: true,
    onCheck: handleCheck,
    multiple: true,
    defaultExpandAll: true,
    selectable: false,
    switcherIcon: <CaretDownOutlined />,
    fieldNames
  };

  return (
    <SearchFieldWrapper {...props}>
      <div style={{ border: "1px solid lightgray", padding: "5px" }}>
        <Tree {...treeProps} />
      </div>
    </SearchFieldWrapper>
  )
}
