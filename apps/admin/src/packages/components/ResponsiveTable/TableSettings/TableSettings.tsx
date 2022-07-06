import React, { useEffect, useState } from "react"
import { Modal } from "~/packages/components/Modal/Modal"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { Button, Card, Col, Form, Row } from "antd"
import { putSpaceBetweenCapitalLetters } from "~/packages/utils/util"
import { VisibleColumns } from "~/packages/components/ResponsiveTable/TableSettings/VisibleColumns"
import { HiddenColumns } from "~/packages/components/ResponsiveTable/TableSettings/HiddenColumns"
import { IUserTableMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { PreferenceQueries } from "~/packages/services/Api/Queries/AdminQueries/Preferences";
import { SettingsActionButtons } from "~/packages/components/ResponsiveTable/TableSettings/SettingsActionButtons"

export const TableSettings = (props: {
  tableName?: string
  activeColumns: any[]
  allColumns: any[]
  reload: () => void
}) => {
  const [showModal, setShowModal] = useState(false)
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
          setShowModal(false)
          props.reload()
        }
      })
    }
  }

  return (
    <>
      <IconButton toolTip="Settings" onClick={() => setShowModal(true)} iconType="settings" />
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          loading={loading}
          loadingTip="Saving Table Configuration"
          width="1000px"
        >
          <Card
            title={`Settings For ${props.tableName ? putSpaceBetweenCapitalLetters(props.tableName.replace("Columns", "")) : "This Table"
              }`}
            actions={[
              <Button type="primary" onClick={() => setShowModal(false)}>Close</Button>,
              <Button type="primary" onClick={apply}>
                Apply
              </Button>
            ]}
          >
            <Row gutter={4} justify="space-between" style={{ overflowY: "scroll", maxHeight: "50vh" }}>
              <Col xs={24} sm={24} md={8}>
                <VisibleColumns
                  visibleColumns={visibleColumns}
                  setVisibleColumns={setVisibleColumns}
                  formInstance={visibleListFormInstance}
                />
              </Col>
              <Col xs={24} sm={24} md={2}>
                <SettingsActionButtons
                  updateVisibleColumns={updateVisibleColumns}
                  updateHiddenColumns={updateHiddenColumns}
                  reload={reload}
                />
              </Col>
              <Col xs={24} sm={24} md={14}>
                <HiddenColumns hiddenColumns={hiddenColumns} formInstance={hiddenListFormInstance} />
              </Col>
            </Row>
          </Card>
        </Modal>
      )}
    </>
  )
}
