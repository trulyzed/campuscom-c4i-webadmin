import React, { useEffect, useState } from "react"
import { Modal } from "~/Modal/Modal"
import { Button, Card, Col, Form, Row } from "antd"
import { putSpaceBetweenCapitalLetters } from "@packages/utilities/lib/util"
import { VisibleColumns } from "~/ResponsiveTable/TableSettings/VisibleColumns"
import { HiddenColumns } from "~/ResponsiveTable/TableSettings/HiddenColumns"
import { IUserTableMetaConfig } from "~/ResponsiveTable/TableMetaShadowingProcessor"
import { PreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Preferences";
import { ContextAction } from "~/Actions/ContextAction"

export const TableSettings = (props: {
  tableName?: string
  activeColumns: any[]
  allColumns: any[]
  reload: () => void
  show: boolean
  onToggle: (status: boolean) => void
  hideIcon?: boolean
}) => {
  const [visibleListFormInstance] = Form.useForm()
  const [hiddenListFormInstance] = Form.useForm()
  const [visibleColumns, setVisibleColumns] = useState<any[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setVisibleColumns(props.activeColumns)
    setHiddenColumns(
      props.allColumns.filter((x) => props.activeColumns.findIndex((ac) => ac.dataIndex === x.dataIndex) === -1)
    )
  }, [props.activeColumns, props.allColumns])

  const updateVisibleColumns = () => {
    const listToRemove: any[] = []
    const formValues = visibleListFormInstance.getFieldsValue()
    visibleColumns.forEach((col) => {
      const checkboxFieldName = col.dataIndex + "__checkbox"
      if (formValues[checkboxFieldName]) {
        listToRemove.push(col)
      }
    })
    const _visibleColumns = visibleColumns.filter((x) => {
      const found = listToRemove.find((item) => item.dataIndex === x.dataIndex)
      return !found
    })
    const _hiddenColumns = [...hiddenColumns, ...listToRemove]
    setHiddenColumns(_hiddenColumns)
    setVisibleColumns(_visibleColumns)
  }

  const updateHiddenColumns = () => {
    const listToRemove: any[] = []
    const formValues = hiddenListFormInstance.getFieldsValue()
    hiddenColumns.forEach((col) => {
      const checkboxFieldName = col.dataIndex + "__checkbox"
      if (formValues[checkboxFieldName]) {
        listToRemove.push(col)
      }
    })
    const _hiddenColumns = hiddenColumns.filter((x) => {
      const found = listToRemove.find((item) => {
        if (item.dataIndex === x.dataIndex) console.log(item.dataIndex, x.dataIndex, item.dataIndex === x.dataIndex)
        return item.dataIndex === x.dataIndex
      })
      return !found
    })
    const _visibleColumns = [...visibleColumns, ...listToRemove]
    setHiddenColumns(_hiddenColumns)
    setVisibleColumns(_visibleColumns)
  }

  const reload = () => {
    PreferenceQueries.deletePreferences({ params: { table_name: props.tableName } }).finally(() => props.reload())
  }

  const apply = () => {
    const formValues = visibleListFormInstance.getFieldsValue()
    let tableMetaConfig: { [key: string]: IUserTableMetaConfig } = {}
    props.allColumns.forEach((col) => {
      const inputFieldName = col.dataIndex + "__input"
      let config: IUserTableMetaConfig = {}
      const visibleIndex = visibleColumns.findIndex((x) => x.dataIndex === col.dataIndex)
      if (visibleIndex >= 0) {
        config = {
          title: formValues[inputFieldName],
          columnPosition: visibleIndex,
          hidden: false,
          defaultSortOrder: null
        }
      } else {
        config = {
          title: String(col.title),
          columnPosition: undefined,
          hidden: true,
          defaultSortOrder: null
        }
      }
      tableMetaConfig = { ...tableMetaConfig, [String(col.dataIndex)]: config }
    })
    if (props.tableName) {
      setLoading(true)
      PreferenceQueries.saveOrUpdatePreferences({
        data: {
          table_name: props.tableName,
          value: tableMetaConfig
        }
      }).then((response) => {
        if (response.success) {
          setLoading(false)
          props.onToggle(false)
          props.reload()
        }
      })
    }
  }

  return props.show ? (
    <Modal
      closeModal={() => props.onToggle(false)}
      loading={loading}
      loadingTip="Saving Table Configuration"
      width="1000px"
    >
      <Card title={
        <Row>
          <Col md={{ span: 22, order: 0 }} xs={{ span: 24, order: 1 }}>
            <h2>
              Table Settings for {props.tableName ? putSpaceBetweenCapitalLetters(props.tableName.replace("Columns", "")) : "This Table"}
            </h2>
          </Col>
          <Col xs={{ span: 2, offset: 22, }} md={{ offset: 0 }} className={"text-right"}>
            <ContextAction tooltip="Close" type="close" iconColor="primary" onClick={() => props.onToggle(false)} />
          </Col>
        </Row>
      }>
        <Row gutter={[20, 20]} justify="space-between" style={{ overflowY: "auto", maxHeight: "65vh" }}>
          <Col xs={24} sm={24} md={12}>
            <VisibleColumns
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
              formInstance={visibleListFormInstance}
              updateVisibleColumns={updateVisibleColumns}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <HiddenColumns hiddenColumns={hiddenColumns} formInstance={hiddenListFormInstance} updateHiddenColumns={updateHiddenColumns} />
          </Col>
        </Row>
        <Row justify="end" gutter={[8, 8]} style={{
          paddingTop: "25px",
          borderTop: "1px solid #f0f2f5",
          marginTop: "30px"
        }}>
          <Col>
            <Button onClick={reload}>Reset</Button>
          </Col>
          <Col>
            <Button onClick={() => props.onToggle(false)}>Close</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={apply}>
              Apply
            </Button>
          </Col>
        </Row>
      </Card>
    </Modal>
  ) : null
}
