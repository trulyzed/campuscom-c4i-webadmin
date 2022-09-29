import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"

export const seatBlockListTableColumns: TableColumnType = [
  {
    title: "Ref ID",
    dataIndex: "reservation_ref",
    render: (text: any, record: any) => renderLink(`/storefront-data/seat-block/${record.id}`, text),
    sorter: (a: any, b: any) => a.reservation_ref - b.reservation_ref
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: "Order Ref",
    dataIndex: "cart",
    render: (text: any) => renderLink(`/storefront-data/order/${text.id}`, text.order_ref),
    sorter: (a: any, b: any) => a.cart.order_ref - b.cart.order_ref
  },
  {
    title: "Purchaser",
    dataIndex: "purchaser",
    render: (text: any) => text.name,
    sorter: (a: any, b: any) => a.purchaser.name - b.purchaser.name
  },
  {
    title: "Order Date",
    dataIndex: "reservation_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.reservation_date - b.reservation_date
  },
  {
    title: "Number of Seats",
    dataIndex: "number_of_seats",
    sorter: (a: any, b: any) => a.number_of_seats - b.number_of_seats
  },
  {
    title: "Registered Students",
    dataIndex: "registered_students",
    sorter: (a: any, b: any) => a.registered_students - b.registered_students
  },
  {
    title: "Available Seats",
    dataIndex: "available_seats",
    sorter: (a: any, b: any) => a.available_seats - b.available_seats
  },
]

export const getSeatBlockListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: seatBlockListTableColumns,
    searchFunc: SeatBlockQueries.getPaginatedList,
    tableName: 'SeatBlock'
  }
}
