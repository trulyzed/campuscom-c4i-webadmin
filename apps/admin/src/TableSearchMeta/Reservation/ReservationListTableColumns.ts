import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const reservationListTableColumns: TableColumnType = [
  {
    title: "Ref ID",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/store/seat-block/${record.id}`, text),
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: "Order Ref",
    dataIndex: "order_ref",
    render: (text: any) => renderLink(`/administration/order/${text}`, text),
    sorter: (a: any, b: any) => a.order_ref - b.order_ref
  },
  {
    title: "Purchaser",
    dataIndex: "purchaser",
    sorter: (a: any, b: any) => a.purchaser - b.purchaser
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.order_date - b.order_date
  },
  {
    title: "Number of Sears",
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

export const getReservationListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: reservationListTableColumns,
    searchFunc: QueryConstructor((params) => CompanyQueries.getPaginatedList(params).then(resp => resp.success ? ({
      ...resp,
      data
    }) : resp), [CompanyQueries.getList]),
    tableName: 'Reservation'
  }
}

const data = [
  {
    id: "a108eed8-9447-44a2-8c4a-080162aa81b7",
    ref_id: 1,
    store: {
      name: "BAU",
      id: "034bd604-8d5d-4a56-9302-9b6db3bb2584",
    },
    order_ref: 32,
    purchaser: "SRK Tapu",
    order_date: "2022-09-06T09:56:08.413224Z",
    number_of_seats: "20",
    registered_students: "5",
    available_seats: "15",
    expires_on: "2022-12-014T04:41:01.413224Z",
  }
]
