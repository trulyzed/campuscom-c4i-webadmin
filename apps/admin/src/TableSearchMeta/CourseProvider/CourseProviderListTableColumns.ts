import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const courseProviderListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/course-provider/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Code",
    dataIndex: 'code',
    sorter: (a: any, b: any) => a.code - b.code
  },
]

export const getCourseProviderListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: courseProviderListTableColumns,
    searchFunc: QueryConstructor((params) => CourseProviderQueries.getPaginatedList(params), [CourseProviderQueries.getList]),
    tableName: 'CourseProvider'
  }
}
