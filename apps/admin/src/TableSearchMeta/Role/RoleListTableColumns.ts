import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { RoleQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Roles"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const roleListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/role/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
]

export const getRoleListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: roleListTableColumns,
    searchFunc: QueryConstructor((params) => RoleQueries.getPaginatedList(params), [RoleQueries.getList]),
    tableName: 'Role'
  }
}
