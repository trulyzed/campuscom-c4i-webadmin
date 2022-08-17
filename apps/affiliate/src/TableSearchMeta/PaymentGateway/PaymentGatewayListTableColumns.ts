import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { PaymentGatewayQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentGateways"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const paymentGatewayListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/configuration/payment-gateway/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Last Update Date",
    dataIndex: "last_update_date",
    sorter: (a: any, b: any) => a.last_update_date - b.last_update_date
  },
]

export const getPaymentGatewayListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: paymentGatewayListTableColumns,
    searchFunc: QueryConstructor((params) => PaymentGatewayQueries.getPaginatedList(params), [PaymentGatewayQueries.getList]),
    tableName: 'PaymentGateway'
  }
}
