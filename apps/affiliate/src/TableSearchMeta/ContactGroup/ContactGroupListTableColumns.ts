import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { ContactGroupQueries } from "~/packages/services/Api/Queries/AdminQueries/ContactGroups"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const contactGroupListTableColumns: TableColumnType = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/contact-group/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/store/${text.id}`, text.name) : text,
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_active - b.is_active
  },
]

export const getContactGroupListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: contactGroupListTableColumns,
    searchFunc: QueryConstructor((params) => ContactGroupQueries.getPaginatedList(params), [ContactGroupQueries.getPaginatedList]),
    tableName: 'ContactGroup'
  }
}
