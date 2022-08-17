import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const companyListTableColumns: TableColumnType = [
  {
    title: "Company",
    dataIndex: "company_name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/company/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.company_name - b.company_name
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/store/${text.id}`, text.name) : text,
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
]

export const getCompanyListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: companyListTableColumns,
    searchFunc: QueryConstructor((params) => CompanyQueries.getPaginatedList(params), [CompanyQueries.getList]),
    tableName: 'Company'
  }
}
