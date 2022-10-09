import { List } from "@packages/components/lib/DisplayFormatter/List"
import { renderBoolean, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CompanyUserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CompanyUsers"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const companyUserListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => renderLink(`/administration/affiliate-user/${record.id}`, record.name),
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (_, record: any) => record.email,
    sorter: (a: any, b: any) => a.email - b.email
  },
  {
    title: "Organizations",
    dataIndex: "companies",
    render: (text: any) => <List showInTags data={text.map((i: any) => i.name)} />,
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
    render: (_, record: any) => renderBoolean(record.is_active),
    sorter: (a: any, b: any) => a.is_active - b.is_active
  },
]

export const getCompanyUserListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: companyUserListTableColumns,
    searchFunc: QueryConstructor((params) => CompanyUserQueries.getPaginatedList(params), [CompanyUserQueries.getPaginatedList]),
    tableName: 'CompanyUser'
  }
}
