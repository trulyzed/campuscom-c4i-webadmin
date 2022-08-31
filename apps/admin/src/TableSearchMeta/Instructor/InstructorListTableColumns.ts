import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { InstructorQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Instructors"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const instructorListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => renderLink(`/course-provider/instructor/${record.id}`, text),
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Provider",
    dataIndex: 'provider',
    render: (text: any, record: any) => renderLink(`/administration/course-provider/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.provider - b.provider
  },
]

export const getInstructorListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: instructorListTableColumns,
    searchFunc: QueryConstructor((params) => InstructorQueries.getPaginatedList(params), [InstructorQueries.getList]),
    tableName: 'Instructor'
  }
}
