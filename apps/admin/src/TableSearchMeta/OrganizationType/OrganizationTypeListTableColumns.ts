import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const organizationTypeListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/organization-type/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
]

export const getOrganizationTypeListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: organizationTypeListTableColumns,
    searchFunc: QueryConstructor((params) => OrganizationTypeQueries.getPaginatedList(params), [OrganizationTypeQueries.getPaginatedList]),
    tableName: 'OrganizationType'
  }
}
