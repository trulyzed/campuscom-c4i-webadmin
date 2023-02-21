import { TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EmployeeTransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/EmployeeTransactions"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const employeeTransactionTableColumns: TableColumnType = [
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a: any, b: any) => Number(a.amount) - Number(b.amount)
  },
  {
    title: "Transaction Type",
    dataIndex: "transaction_type",
    sorter: (a: any, b: any) => a.transaction_type - b.transaction_type
  },
  {
    title: "Note",
    dataIndex: "credit_note",
    sorter: (a: any, b: any) => a.credit_note - b.credit_note
  },
]

export const getEmployeeTransactionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: employeeTransactionTableColumns,
    searchFunc: QueryConstructor((params) => EmployeeTransactionQueries.getPaginatedList(params), [EmployeeTransactionQueries.getList]),
    tableName: 'EmployeeTransaction'
  }
}
