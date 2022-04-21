import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { DiscountProgramUsageHistoryQueries } from "~/packages/services/Api/Queries/AdminQueries/DiscountProgramUsageHistories"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const discountProgramUsageHistoryListTableColumns: TableColumnType = [
  {
    title: 'Order',
    dataIndex: 'order_ref',
    render: (text: any, record: any) => record.id ? renderLink(`/storefront-data/order/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.id - b.id
  },
  {
    title: 'Actual Amount',
    dataIndex: 'gross_amount',
    sorter: (a: any, b: any) => a.gross_amount - b.gross_amount
  },
  {
    title: 'Discount Amount',
    dataIndex: 'total_discount',
    sorter: (a: any, b: any) => a.total_discount - b.total_discount
  },
  {
    title: 'Total Amount',
    dataIndex: 'total_amount',
    sorter: (a: any, b: any) => a.total_amount - b.total_amount
  },
]

export const getDiscountProgramUsageHistoryListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: discountProgramUsageHistoryListTableColumns,
    searchFunc: QueryConstructor((params) => DiscountProgramUsageHistoryQueries.getPaginatedList(params), [DiscountProgramUsageHistoryQueries.getList]),
  }
}
