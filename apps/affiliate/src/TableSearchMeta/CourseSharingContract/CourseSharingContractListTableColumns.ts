import { renderBoolean, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CourseSharingContractQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseSharingContracts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const courseSharingContractListTableColumns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "id",
    render: (text: any, record: any) => renderLink(`/administration/course-sharing-contract/${record.id}`, text),
    sorter: (a: any, b: any) => a.id - b.id
  },
  {
    title: "Course Provider",
    dataIndex: 'course_provider',
    render: (text: any, record: any) => renderLink(`/administration/course-provider/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.course_provider - b.course_provider
  },
  {
    title: "Is Active",
    dataIndex: 'is_active',
    sorter: (a: any, b: any) => a.is_active - b.is_active,
    render: renderBoolean
  },
]

export const getCourseSharingContractListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: courseSharingContractListTableColumns,
    searchFunc: QueryConstructor((params) => CourseSharingContractQueries.getPaginatedList(params), [CourseSharingContractQueries.getList]),
    tableName: 'CourseSharingContract'
  }
}
