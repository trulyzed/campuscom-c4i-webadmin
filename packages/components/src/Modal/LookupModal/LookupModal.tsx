import React, { useState } from "react"
import { IField } from "~/Form/common"
import { Button, Card, Col, Row } from "antd"
import { HelpButton } from "~/Help/HelpButton"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { ResponsiveTable, TableColumnType } from "~/ResponsiveTable"
import { zIndexLevel } from "~/zIndexLevel"
import { Modal } from "~/Modal/Modal"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

interface ILookupModal {
  title: string
  closeModal: (items?: any[]) => void
  searchFunc: IQuery
  isArray?: boolean
  columns: TableColumnType
  meta: IField[]
  metaName: string
  defaultFormValue?: { [key: string]: any }
  initialFormValue?: { [key: string]: any }
  zIndex?: number
  helpKey?: string
}

export function LookupModal(props: ILookupModal) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any } | undefined>(
    props.initialFormValue ? { ...props.initialFormValue, ...props.defaultFormValue } : undefined
  )
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const rowSelection: any = {
    type: props.isArray ? "checkbox" : "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedItems(selectedRows)
    }
  }
  return (
    <>
      <Modal width="1000px" zIndex={(props.zIndex || zIndexLevel.defaultModal) + 1} closeModal={props.closeModal}>
        <Card
          title={
            <Row justify="space-between">
              <Col>{props.title}</Col>
              <Col>
                <HelpButton helpKey={props.helpKey} />
              </Col>
            </Row>
          }
          actions={[
            <Button type="ghost" onClick={() => props.closeModal()}>
              Cancel
            </Button>,
            <Button
              type="primary"
              disabled={selectedItems.length === 0}
              onClick={() => props.closeModal(selectedItems)}
            >
              Select
            </Button>
          ]}
        >
          <div className="modal-card">
            <MetaDrivenForm
              meta={props.meta}
              metaName={props.metaName}
              initialFormValue={searchParams}
              onApplyChanges={(newSearchParams) => {
                console.log(props.defaultFormValue, newSearchParams)
                setSearchParams({
                  ...props.defaultFormValue,
                  ...newSearchParams
                })
              }}
              stopProducingQueryParams={true}
            />
            <ResponsiveTable
              columns={props.columns}
              searchFunc={props.searchFunc}
              searchParams={searchParams}
              isModal={true}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </Modal>
    </>
  )
}
