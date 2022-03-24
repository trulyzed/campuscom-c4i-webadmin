import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { UserQueries } from "~/packages/services/Api/Queries/AdminQueries/Users"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const userListTableColumns: TableColumnType = [
  {
    title: "Username",
    dataIndex: "username",
    render: (text: any, record: any) => renderLink(`/administration/user/${record.id}`, text),
    sorter: (a: any, b: any) => a.username - b.username
  },
  {
    title: "Email",
    dataIndex: 'email',
    sorter: (a: any, b: any) => a.email - b.email
  },
  {
    title: "Is active",
    dataIndex: 'is_active',
    sorter: (a: any, b: any) => a.is_active - b.is_active,
    render: renderBoolean
  },
]

export const getUserListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: userListTableColumns,
    searchFunc: QueryConstructor((params) => UserQueries.getPaginatedList(params), [UserQueries.getList]),
  }
}
