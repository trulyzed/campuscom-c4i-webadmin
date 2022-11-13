import { useCallback, useState } from "react"
import { Button } from "antd"
import { IField } from "~/Form/common"
import { MetaDrivenForm } from "~/Form/MetaDrivenForm"
import { ResponsiveTable, TableColumnType } from "~/ResponsiveTable"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { ModalWrapper } from "~/Modal/ModalWrapper"
import { TableRowSelection } from "antd/lib/table/interface"

export interface ILookupModal {
  title: string
  modalTitle: string
  formTitle?: string
  tableTitle?: string
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
  const { onSubmit } = props
  const [searchParams, setSearchParams] = useState<{ [key: string]: any } | undefined>(
    props.initialFormValue ? { ...props.initialFormValue, ...props.defaultFormValue } : undefined
  )
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const rowSelection: TableRowSelection<{ [key: string]: any }> = {
    type: props.isArray ? "checkbox" : "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedItems(selectedRows)
    },
    preserveSelectedRowKeys: true
  }

  const handleSubmit = useCallback(() => {
    onSubmit(selectedItems)
  }, [onSubmit, selectedItems])

  return (
    <ModalWrapper
      title={props.modalTitle}
      loading={props.apiCallInProgress}
      onClose={props.onClose}
      actions={[
        <Button type="ghost" onClick={props.onClose}>Cancel</Button>,
        <Button
          type="primary"
          disabled={selectedItems.length === 0}
          onClick={handleSubmit}>
          Select
        </Button>
      ]}>
      <MetaDrivenForm
        title={props.formTitle || `${props.title} Filters`}
        helpKey={props.helpKey}
        meta={props.meta}
        metaName={props.metaName}
        initialFormValue={searchParams}
        onApplyChanges={(newSearchParams) => {
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
        tableTitle={props.tableTitle || props.title}
        columns={props.columns}
        searchFunc={props.searchFunc}
        searchParams={searchParams}
        rowSelection={rowSelection}
        isModal
      />
    </ModalWrapper>
  )
}
