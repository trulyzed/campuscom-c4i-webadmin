import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Employees"

export const employeeListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => renderLink(`/administration/employee/${record.id}`, text),
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: "Organization",
    dataIndex: "company",
    render: (text: any) => renderLink(`/administration/organization/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.company.name - b.company.name
  },
]

export const getEmployeeListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: employeeListTableColumns,
    searchFunc: EmployeeQueries.getPaginatedList,
    tableName: 'Employee'
  }
}
