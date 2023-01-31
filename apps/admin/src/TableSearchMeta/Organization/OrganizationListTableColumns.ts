import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const organizationListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/company/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Short Name",
    dataIndex: "short_name",
    sorter: (a: any, b: any) => a.short_name - b.short_name
  },
  {
    title: "Organization Type",
    dataIndex: "organization_type",
    render: (text: any) => text.name,
    sorter: (a: any, b: any) => a.organization_type.name - b.organization_type.name
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a: any, b: any) => a.email - b.email
  },
  {
    title: "Contact",
    dataIndex: "contact_no",
    sorter: (a: any, b: any) => a.contact_no - b.contact_no
  },
]

export const getOrganizationListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: organizationListTableColumns,
    searchFunc: QueryConstructor((params) => OrganizationQueries.getPaginatedList(params), [OrganizationQueries.getList]),
    tableName: 'Organization'
  }
}
