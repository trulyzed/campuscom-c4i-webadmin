import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const departmentListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/department/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Short Name",
    dataIndex: "short_name",
    sorter: (a: any, b: any) => a.short_name - b.short_name
  },
  {
    title: "Organization",
    dataIndex: "organization",
    sorter: (a: any, b: any) => a.organization.name - b.organization.name
  },
]

export const getDepartmentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: departmentListTableColumns,
    searchFunc: QueryConstructor((params) => DepartmentQueries.getPaginatedList(params), [DepartmentQueries.getList]),
    tableName: 'Department'
  }
}
