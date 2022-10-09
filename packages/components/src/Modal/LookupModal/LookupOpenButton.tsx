import React, { useEffect, useState } from "react"
import { Select, Spin } from "antd"
import { IField, IGeneratedField, SearchFieldWrapper } from "~/Form/common"
import { LookupModal } from "~/Modal/LookupModal/LookupModal"
import { TableColumnType } from "~/ResponsiveTable"
import { SearchOutlined } from "@ant-design/icons"
import { debounce } from "@packages/utilities/lib/debounce"
import { putSpaceBetweenCapitalLetters } from "@packages/utilities/lib/util"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export interface ILookupOpenButton extends IGeneratedField {
  displayKey: string
  valueKey: string
  searchFunc: IQuery
  searchFieldName?: string
  lookupModalTitle: string
  disabled?: boolean
  columns: TableColumnType
  meta: IField[]
  metaName: string
  defaultFormValue?: { [key: string]: any }
  entityLookupFunc?: () => Promise<any>
  zIndex?: number
  renderLabel?: (Params: { [key: string]: any }) => React.ReactNode
}

export function LookupOpenButton(props: ILookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [keepOptionsOpen, setKeepOptionsOpen] = useState(false)

  useEffect(() => {
    const defaultValue = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (
      !(
        (Array.isArray(defaultValue) && defaultValue.length === 0) ||
        defaultValue === undefined ||
        defaultValue === null ||
        defaultValue === "null"
      )
    ) {
      props.searchFunc({ params: { [props.valueKey]: defaultValue } }).then((response) => {
        if (response.success) {
          closeModal(response.data)
        }
      })
    } else {
      setTimeout(() => {
        const input = document.getElementById(props.fieldName)
        if (input) {
          input.removeAttribute("aria-activedescendant")
          input.removeAttribute("role")
        }
      }, 0)
    }
    // eslint-disable-next-line
  }, [props.defaultValue, props.fieldName])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      if (props.extraProps && props.extraProps.isArray) {
        const previousValues: any[] = props.formInstance.getFieldValue(props.fieldName) || []
        console.log("previouse values ", previousValues)
        props.formInstance.setFieldsValue({
          [props.fieldName]: [...previousValues, ...items.map((x) => x[props.valueKey])]
        })
        setOptions([...options, ...items])
      } else {
        setOptions(items)
        props.formInstance.setFieldsValue({
          [props.fieldName]: items[0][props.valueKey]
        })
      }
    }
    if (props.onSelectedItems) {
      const previousValue = props.formInstance.getFieldValue(props.fieldName)
      const _items: any[] = []
      if (Array.isArray(previousValue)) {
        previousValue.forEach((x) => {
          const item = [...options, ...(items || [])].find((op) => op[props.valueKey] === x)
          _items.push(item)
        })
        props.onSelectedItems(_items)
      } else {
        props.onSelectedItems(items)
      }
    }
    setShowModal(false)
  }

  const handleSearch = debounce((searchInput: any): void => {
    if (!searchInput || searchInput === "") return
    setLoading(true)
    props.searchFunc({ params: { [props.searchFieldName || props.displayKey]: searchInput } }).then((x) => {
      if (x.success) {
        setOptions(x.data)
      }
      setLoading(false)
    })
  }, 500)
  return (
    <>
      <SearchFieldWrapper
        help={props.help}
        validateStatus={props.validateStatus}
        fieldName={props.fieldName}
        label={props.label}
        rules={props.rules}
        formInstance={props.formInstance}
        labelColSpan={props.labelColSpan}
        wrapperColSpan={props.wrapperColSpan}
      >
        <Select
          showSearch
          loading={loading}
          placeholder={
            props.placeholder
              ? props.placeholder
              : `Search By ${props.searchFieldName
                ? putSpaceBetweenCapitalLetters(props.searchFieldName)
                : putSpaceBetweenCapitalLetters(props.displayKey)
              }`
          }
          allowClear={true}
          filterOption={false}
          aria-labelledby={props.ariaLabel}
          disabled={props.disabled}
          notFoundContent={loading ? <Spin size="small" /> : null}
          {...(props.extraProps && props.extraProps.isArray && { mode: "multiple" })}
          listItemHeight={10}
          listHeight={256}
          open={keepOptionsOpen}
          defaultActiveFirstOption={false}
          onChange={(value: any) => {
            if (props.onSelectedItems) {
              if (Array.isArray(value)) {
                const __: any[] = []
                options.forEach((x) => {
                  if (!!value.find((val) => val === x[props.valueKey])) __.push(x)
                })
                props.onSelectedItems(__)
              } else {
                const __ = options.find((x) => x[props.valueKey] === value)
                props.onSelectedItems([__])
              }
            }
          }}
          onSearch={debounce((_searchKey: any) => {
            setSearchKey(_searchKey)
          }, 200)}
          onKeyDown={(event) => {
            if (event.keyCode === 13 && !(!searchKey || searchKey === "")) {
              setKeepOptionsOpen(true)
              setOptions([])
              handleSearch(searchKey)
            }
          }}
          onMouseDown={() => {
            setKeepOptionsOpen(true)
          }}
          onFocus={() => {
            setKeepOptionsOpen(true)
          }}
          onBlur={() => {
            setKeepOptionsOpen(false)
          }}
          onSelect={() => {
            setKeepOptionsOpen(false)
          }}
          menuItemSelectedIcon={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
          suffixIcon={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
        >
          {Array.isArray(options) &&
            options.map((x, i) => (
              <Select.Option value={x[props.valueKey]} key={`${x[props.valueKey]}_${i}`}>
                {props.renderLabel ? props.renderLabel(x) : x[props.displayKey]}
              </Select.Option>
            ))}
        </Select>
      </SearchFieldWrapper>
      {showModal && (
        <LookupModal
          title={props.lookupModalTitle}
          {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
          closeModal={closeModal}
          searchFunc={props.searchFunc}
          columns={props.columns}
          meta={props.meta}
          metaName={props.metaName}
          zIndex={props.zIndex}
          defaultFormValue={props.defaultFormValue}
        />
      )}
    </>
  )
}
