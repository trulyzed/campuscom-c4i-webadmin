import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const identityProviderListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/configuration/identity-provider/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Slug",
    dataIndex: 'slug',
    sorter: (a: any, b: any) => a.slug - b.slug
  },
]

export const getIdentityProviderListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: identityProviderListTableColumns,
    searchFunc: QueryConstructor((params) => IdentityProviderQueries.getPaginatedList(params), [IdentityProviderQueries.getList]),
  }
}
