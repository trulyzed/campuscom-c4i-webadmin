import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { PaymentGatewayConfigQueries } from "~/packages/services/Api/Queries/AdminQueries/PaymentGatewayConfigs"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const paymentGatewayConfigListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/configuration/payment-gateway-config/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Is Sandbox",
    dataIndex: "is_sandbox",
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_sandbox - b.is_sandbox
  },
]

export const getPaymentGatewayConfigListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: paymentGatewayConfigListTableColumns,
    searchFunc: QueryConstructor((params) => PaymentGatewayConfigQueries.getPaginatedList(params), [PaymentGatewayConfigQueries.getList]),
    tableName: 'PaymentGatewayConfig'
  }
}
