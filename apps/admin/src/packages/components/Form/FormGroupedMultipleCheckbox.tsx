import React, { useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { Checkbox, Col, Row } from "antd"
import { eventBus } from "~/packages/utils/EventBus"
import { IQueryParams } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export function FormGroupedMultipleCheckbox(props: IGeneratedField & { columnFlex?: string, dependencyValue?: any }) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { refLookupService, displayKey, valueKey, onDependencyChange } = props

  const loadOptions = async (params?: IQueryParams): Promise<any[]> => {
    if (props.options?.length) {
      const adjustedOptions = props.options?.map((x) => {
        return {
          group: x[displayKey || "group"],
          options: x[valueKey || "options"]
        }
      })
      setOptions(adjustedOptions)
      return adjustedOptions
    } else if (refLookupService) {
      setLoading(true)
      const x = await refLookupService(params)
      setLoading(false)
      if (x.success) {
        x.data = x.data.map((y: any) => ({
          group: y[displayKey || "group"],
          options: y[valueKey || "options"]
        }))
        setOptions(x.data)
        return x.data
      }
    }
    return []
  }

  useEffect(() => {
    onDependencyChange?.(props.dependencyValue, {
      loadOptions: async (...args): Promise<any[]> => {
        props.formInstance.setFieldsValue({ [props.fieldName]: undefined })
        if (Object.keys(props.dependencyValue || {}).find(key => props.dependencyValue[key] !== undefined)) {
          const response = await loadOptions(...args).then(options => {
            const matchedValue = options.find(o => o.value === props.defaultValue)
            if (matchedValue) props.formInstance.setFieldsValue({ [props.fieldName]: matchedValue })
            return options
          })
          return response
        } else {
          setOptions([])
        }
        return []
      },
      setOptions: (data) => setOptions(data)
    })

    // eslint-disable-next-line
  }, [props.dependencyValue, onDependencyChange, props.defaultValue, props.fieldName, props.formInstance])

  useEffect(() => {
    const eventName = `REFRESH_SEARCH_DROPDOWN_${(refLookupService || new Date().getTime())?.toString() + displayKey + valueKey
      }`
    eventBus.subscribe(eventName, loadOptions)
    eventBus.publish(eventName)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <SearchFieldWrapper {...props}>
      <Checkbox.Group style={{ width: "100%" }} onChange={props.onSelectedItems} disabled={props.disabled}>
        <Row gutter={5}>
          {options.map((g: any, idx) => {
            //const allSelected = props.formInstance.getFieldValue(props.fieldName).filter((i: any) => g.options.find((o: any) => o.id === i)).length >= g.options.length
            return (
              <Col key={`${g[props.displayKey || "group"]}_${idx}`} span={12} style={{ marginBottom: '5px' }}>
                <div style={{ border: "1px solid lightgray", padding: "5px" }}>
                  <Row gutter={2}>
                    <Col>{g[props.displayKey || "group"]}</Col>
                  </Row>
                  <Row>
                    {!loading &&
                      g.options &&
                      g.options.length > 0 &&
                      g.options.map((x: any, i: number) => (
                        <Col flex={props.columnFlex ? props.columnFlex : "auto"} key={i}>
                          <Checkbox value={x[props.valueKey2 || "value"]}>{x[props.displayKey2 || "label"]}</Checkbox>
                        </Col>
                      ))}
                  </Row>
                </div>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    </SearchFieldWrapper>
  )
}
