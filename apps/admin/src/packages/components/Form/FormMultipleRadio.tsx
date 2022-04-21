import React, { useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Col, Radio, Row } from "antd"
import { eventBus } from "~/packages/utils/EventBus"

export function FormMultipleRadio(
  props: IGeneratedField & {
    onSelectedItems?: (params: any) => void
    columnFlex?: string
  }
) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { refLookupService, displayKey, valueKey, fieldName } = props

  const loadOptions = () => {
    if (props.defaultValue !== undefined)
      props.formInstance.setFieldsValue({
        [props.fieldName]: props.defaultValue
      })
    if (props.options?.length) {
      setOptions(
        props.options?.map((x) => {
          return {
            label: x[displayKey || "label"],
            value: x[valueKey || "value"]
          }
        })
      )
    } else if (refLookupService) {
      setLoading(true)
      refLookupService().then((x) => {
        if (x.success && displayKey && valueKey) {
          x.data = x.data.map((y: any) => ({
            label: y[displayKey || "label"],
            value: y[valueKey || "value"]
          }))
          setOptions(x.data)
        }
        setLoading(false)
      })
    }
  }
  useEffect(() => {
    const eventName = `REFRESH_SEARCH_DROPDOWN_${(refLookupService || new Date().getTime())?.toString() + fieldName}`
    eventBus.subscribe(eventName, loadOptions)
    eventBus.publish(eventName)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <SearchFieldWrapper {...props}>
      <Radio.Group
        style={{ width: "100%" }}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          props.onSelectedItems && props.onSelectedItems(e.target.value)
        }}
      >
        <div style={{ border: "1px solid lightgray", padding: "5px" }}>
          <Row>
            {!loading &&
              options &&
              options.length > 0 &&
              options.map((x, i) => (
                <Col flex={props.columnFlex ? props.columnFlex : "auto"} key={i}>
                  <Radio value={x.value}>{x.label}</Radio>
                </Col>
              ))}
          </Row>
        </div>
      </Radio.Group>
    </SearchFieldWrapper>
  )
}
