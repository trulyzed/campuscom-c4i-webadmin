import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Employees"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const employeeListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/employee-management/employee/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Department",
    dataIndex: "department",
    render: (text: any, record: any) => renderLink(`/administration/department/${record.id}`, text),
    sorter: (a: any, b: any) => a.department.name - b.department.name
  },
]

export const getEmployeeListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: employeeListTableColumns,
    searchFunc: QueryConstructor((params) => EmployeeQueries.getPaginatedList(params), [EmployeeQueries.getList]),
    tableName: 'Employee'
  }
}
