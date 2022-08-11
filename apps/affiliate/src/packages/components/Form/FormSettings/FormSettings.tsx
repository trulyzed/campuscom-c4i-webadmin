import { Button, Card, Checkbox, Form, Input } from "antd"
import React, { useEffect, useState } from "react"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { Modal } from "~/packages/components/Modal/Modal"
import { FixedQuestionSortableTable } from "~/packages/components/ResponsiveTable/FixedQuestionSortableTable"
import { putSpaceBetweenCapitalLetters } from "~/packages/utils/util"
import { zIndexLevel } from "~/packages/components/zIndexLevel"
import { IField } from "~/packages/components/Form/common"
import { MenuOutlined } from "@ant-design/icons"
import { SortableHandle as sortableHandle } from "react-sortable-hoc"
import { debounce } from "~/packages/utils/debounce"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { PreferenceQueries } from "~/packages/services/Api/Queries/AdminQueries/Preferences";
import { FormDropDown } from "~/packages/components/Form/FormDropDown"
import { FormDatePicker } from "~/packages/components/Form/FormDatePicker"

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />)

export const FormSettings = (props: { metaName: string; meta: IField[]; reload: () => void }) => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [formInstance] = Form.useForm()

  useEffect(() => {
    if (showModal) {
      const _dataSource = props.meta.map((x, i) => {
        ; (x as any)["index"] = i
        return { ...x }
      })
      setDataSource(_dataSource)
    } else {
      formInstance.resetFields()
      setDataSource([])
      setDataSource([])
    }
    // eslint-disable-next-line
  }, [props.meta, showModal])

  const onUpdateValue = debounce((Params: any): void => {
    if (!Params) return
    const { key, record } = Params
    let { value } = Params

    if (Array.isArray(value) && value.length > 0) {
      if (value[0] && value[0][record.fieldName] !== undefined) {
        value = value[0][record.fieldName]
      } else {
        value = undefined
      }
    }
    dataSource.forEach((x) => {
      if (record.index === x.index) {
        x[key] = value
      }
      return x
    })
  }, 200)

  const onSortUpdate = (params: any[]) => {
    const _dataSource = params.map((x, i) => {
      ; (x as any)["index"] = i
      return x
    })
    setDataSource(_dataSource)
  }
  const apply = () => {
    const metaConfig: { [key: string]: any } = {}
    dataSource.forEach((x: IField) => {
      metaConfig[x.fieldName] = {
        fieldName: x.fieldName,
        label: x.label,
        sortOrder: dataSource.findIndex((y: IField) => y.fieldName === x.fieldName) + 1,
        placeholder: x.placeholder,
        ariaLabel: x.ariaLabel,
        hidden: x.hidden,
        displayKey: x.displayKey,
        required: x.required,
        defaultValue: x.defaultValue
      }
    })

    setLoading(true)
    PreferenceQueries.saveOrUpdatePreferences({
      params: {
        table_name: props.metaName,
        value: metaConfig
      }
    }).then((response) => {
      if (response && response.success) {
        formInstance.resetFields()
        props.reload()
        setLoading(false)
        setShowModal(false)
      }
    })
  }

  const setDefault = () => {
    setLoading(true)
    PreferenceQueries.deletePreferences({ params: { table_name: props.metaName } }).then((response) => {
      if (response && response.success) {
        formInstance.resetFields()
        props.reload()
        setLoading(false)
        setShowModal(false)
      }
    })
  }

  return (
    <>
      <IconButton iconType="settings" toolTip="Form Settings" onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} zIndex={zIndexLevel.defaultModal + 2} width="1000px">
          <Card
            title={`Settings For ${putSpaceBetweenCapitalLetters(props.metaName.replace("Columns", ""))}`}
            actions={[
              <Button type="primary" onClick={() => setShowModal(false)}>Close</Button>,
              <Button onClick={setDefault} danger>
                Default
              </Button>,
              <Button onClick={apply}>Apply</Button>
            ]}
          >
            <FixedQuestionSortableTable
              rowKey="index"
              loading={loading}
              updatedList={onSortUpdate}
              style={{ maxHeight: "60vh", overflowY: "scroll" }}
              columns={[
                {
                  title: "Field Name",
                  dataIndex: "fieldName",
                  className: "drag-visible",
                  render: (text: string) => (
                    <>
                      <DragHandle /> {text}
                    </>
                  )
                },
                {
                  title: "Label",
                  dataIndex: "label",
                  className: "drag-visible",
                  render: (text: any, record: any) => (
                    <Input
                      defaultValue={text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        e.persist()
                        onUpdateValue({
                          key: "label",
                          value: e.target.value,
                          record
                        })
                      }}
                    />
                  )
                },
                {
                  title: "Type",
                  dataIndex: "inputType",
                  className: "drag-visible"
                },
                {
                  title: "Hidden",
                  dataIndex: "hidden",
                  className: "drag-visible",
                  render: (text: any, record: any) => (
                    <Checkbox
                      defaultChecked={text}
                      onChange={(e: CheckboxChangeEvent): void => {
                        e.preventDefault()
                        onUpdateValue({
                          key: "hidden",
                          value: e.target.checked,
                          record
                        })
                      }}
                    />
                  )
                },
                {
                  title: "Default Value",
                  dataIndex: "defaultValue",
                  className: "drag-visible",
                  render: (text: any, record: IField) => {
                    if (record.inputType === "BOOLEAN") {
                      return (
                        <Checkbox
                          defaultChecked={text}
                          onChange={(e: CheckboxChangeEvent): void => {
                            e.preventDefault()
                            onUpdateValue({
                              key: "defaultValue",
                              value: e.target.checked,
                              record
                            })
                          }}
                        />
                      )
                    } else if (record.inputType === "TEXT" || record.inputType === "TEXTAREA") {
                      return (
                        <Input
                          defaultValue={text}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            e.persist()
                            onUpdateValue({
                              key: "defaultValue",
                              value: e.target.value,
                              record
                            })
                          }}
                        />
                      )
                    } else if (record.inputType === "NUMBER") {
                      return (
                        <Input
                          type="number"
                          defaultValue={text}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            e.persist()
                            onUpdateValue({
                              key: "defaultValue",
                              value: e.target.value,
                              record
                            })
                          }}
                        />
                      )
                    } else if (record.inputType === "DROPDOWN") {
                      return (
                        <Form form={formInstance}>
                          <FormDropDown
                            {...record}
                            defaultValue={text}
                            formInstance={formInstance}
                            label=""
                            labelColSpan={0}
                            wrapperColSpan={24}
                            onSelectedItems={(value) => {
                              onUpdateValue({
                                key: "defaultValue",
                                value: value,
                                record
                              })
                            }}
                          />
                        </Form>
                      )
                    } else if (record.inputType === "DATE_PICKER") {
                      return (
                        <Form form={formInstance}>
                          <FormDatePicker
                            {...record}
                            defaultValue={text}
                            formInstance={formInstance}
                            label=""
                            labelColSpan={0}
                            wrapperColSpan={24}
                            onSelectedItems={(value) => {
                              onUpdateValue({
                                key: "defaultValue",
                                value: value,
                                record
                              })
                            }}
                          />
                        </Form>
                      )
                    } else if (record.inputType === "CUSTOM_FIELD") {
                      return (
                        <>
                          {record.customFilterComponent && (
                            <Form form={formInstance}>
                              <record.customFilterComponent
                                {...record}
                                defaultValue={text}
                                formInstance={formInstance}
                                label=""
                                labelColSpan={0}
                                wrapperColSpan={24}
                                onSelectedItems={(value: any) => {
                                  onUpdateValue({
                                    key: "defaultValue",
                                    value: value,
                                    record
                                  })
                                }}
                              />
                            </Form>
                          )}
                        </>
                      )
                    }
                    return <></>
                  }
                }
              ]}
              dataSource={dataSource}
            />
          </Card>
        </Modal>
      )}
    </>
  )
}
