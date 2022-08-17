import { renderBoolean, renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const discountProgramListTableColumns: TableColumnType = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text: any, record: any) => renderLink(`/administration/discount-program/${record.id}`, text),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: 'Discount Amount',
    dataIndex: 'discount_amount',
    sorter: (a: any, b: any) => a.discount_amount - b.discount_amount
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: (a: any, b: any) => a.type - b.type
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    render: renderDateTime,
    sorter: (a: any, b: any) => a.start_date - b.start_date
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    render: renderDateTime,
    sorter: (a: any, b: any) => a.end_date - b.end_date
  },
  {
    title: 'Is Stackable',
    dataIndex: 'is_stackable',
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_stackable - b.is_stackable
  },
  {
    title: 'Is Published',
    dataIndex: 'is_published',
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_published - b.is_published
  },
]

export const getDiscountProgramListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: discountProgramListTableColumns,
    searchFunc: QueryConstructor((params) => DiscountProgramQueries.getPaginatedList(params), [DiscountProgramQueries.getList]),
    tableName: 'DiscountProgram'
  }
}
