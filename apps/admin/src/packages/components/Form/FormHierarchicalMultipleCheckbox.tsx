import { useState, useEffect, ComponentProps } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Tree } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'

export function FormHierarchicalMultipleCheckbox(props: IGeneratedField) {
  const [checkedKeys, setCheckedKeys] = useState(props.defaultValue)
  const { formInstance, fieldName } = props

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
    switcherIcon: <CaretDownOutlined />
  };

  return (
    <SearchFieldWrapper {...props}>
      <div style={{ border: "1px solid lightgray", padding: "5px" }}>
        <Tree {...treeProps} />
      </div>
    </SearchFieldWrapper>
  )
}
