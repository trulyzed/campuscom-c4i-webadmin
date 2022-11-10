import React, { useState } from "react"
import { IField } from "~/Form/common"
import { Button, Card } from "antd"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { ResponsiveTable, TableColumnType } from "~/ResponsiveTable"
import { zIndexLevel } from "~/zIndexLevel"
import { Modal } from "~/Modal/Modal"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"

export interface ILookupModal {
  title: string
  searchFunc: IQuery
  columns: TableColumnType
  meta: IField[]
  isArray?: boolean
  metaName?: string
  defaultFormValue?: { [key: string]: any }
  initialFormValue?: { [key: string]: any }
  zIndex?: number
  helpKey?: string
  errorMessages?: Array<ISimplifiedApiErrorMessage>
  apiCallInProgress?: boolean
  onClose: () => void
  onSubmit: (items?: any[]) => void
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
      <Modal
        width="1000px"
        zIndex={(props.zIndex || zIndexLevel.defaultModal) + 1}
        closeModal={props.onClose}
        apiCallInProgress={props.apiCallInProgress}
      >
        <Card
          actions={[
            <Button type="ghost" onClick={() => props.onClose()}>
              Cancel
            </Button>,
            <Button
              type="primary"
              disabled={selectedItems.length === 0}
              onClick={() => props.onSubmit(selectedItems)}
            >
              Select
            </Button>
          ]}
        >
          <MetaDrivenForm
            title={props.title}
            helpKey={props.helpKey}
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
            isModal
            stopProducingQueryParams={true}
            errorMessages={props.errorMessages && props.errorMessages}
          />
          <ResponsiveTable
            style={{
              maxHeight: "33vh",
              overflowY: "scroll"
            }}
            columns={props.columns}
            searchFunc={props.searchFunc}
            searchParams={searchParams}
            isModal={true}
            rowSelection={rowSelection}
          />
        </Card>
      </Modal>
    </>
  )
}
