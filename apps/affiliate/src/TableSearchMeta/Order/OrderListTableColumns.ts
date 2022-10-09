import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

export const getOrderListTableColumns = (isModal = false, OrderID?: number): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Order Ref",
      dataIndex: "ref_id",
      render: (text: any, record: any) => renderLink(`/storefront-data/order/${record.id}`, text, isModal),
      sorter: (a: any, b: any) => a.ref_id - b.ref_id
    },
    {
      title: "Store",
      dataIndex: "store",
      //render: (text: any, record: any) => renderLink(`/financials/order/${record.id}`, record.store.name, isModal),
      render: (text: any, record: any) => text.name,
    },
    {
      title: "Purchaser",
      dataIndex: "purchaser_info",
      render: (text: any, record: any) => `${text.first_name} ${text.last_name}`,
    },
    {
      title: "Order Date",
      dataIndex: "datetime",
      render: renderDateTime
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ]

  return {
    columns,
    searchFunc: OrderQueries.getPaginatedList,
    tableName: 'Order',
    showDownload: true
  }
}
