import React, { useState, useEffect } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Tree } from "antd"

export function FormHierarchicalMultipleCheckbox(props: IGeneratedField & { treeData?: any[]; }) {

  const [checkedKeys, setCheckedKeys] = useState(props.defaultValue)

  const { formInstance, fieldName } = props
  useEffect(() => {
    if (fieldName && formInstance && checkedKeys)
      formInstance.setFieldsValue({
        [fieldName]: checkedKeys
      })
  }, [checkedKeys, formInstance, fieldName])

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleSelect = (selectedKeysValue: React.Key[], info: any) => {
    if (info.node) {
      if (!info.node.checked)
        setCheckedKeys((prev: any) => [...prev, ...[info.node.key]])
      else
        setCheckedKeys((prev: any) => {
          const value = prev.filter((item: any) => item !== info.node.key)
          return value
        })
    }
    //setSelectedKeys(selectedKeysValue);
  };

  const treeProps = {
    treeData: props.treeData,
    checkedKeys: checkedKeys,
    checkable: true,
    onCheck: handleCheck,
    multiple: true,
    defaultExpandAll: true,
    onSelect: handleSelect,
    fieldNames: { key: 'key', children: 'submenu', title: 'title' }
  };

  return (
    <SearchFieldWrapper {...props}>
      <Tree {...treeProps} />
    </SearchFieldWrapper>
  )
}
