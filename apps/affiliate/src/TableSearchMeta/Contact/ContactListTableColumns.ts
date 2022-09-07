import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AffiliateQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const contactListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/contact/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Email",
    dataIndex: "primary_email",
    sorter: (a: any, b: any) => a.primary_email - b.primary_email
  },
]

export const getContactListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: contactListTableColumns,
    searchFunc: QueryConstructor((params) => ContactQueries.getPaginatedList(params), [ContactQueries.getList]),
    tableName: 'Contact'
  }
}
