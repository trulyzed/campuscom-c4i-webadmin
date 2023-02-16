import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CourseQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Courses"
import { List } from "@packages/components/lib/DisplayFormatter/List"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const courseListTableColumns: TableColumnType = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text: any, record: any) => renderLink(`/course/${record.id}`, text),
    sorter: (a: any, b: any) => a.course.title - b.course.title
  },
  {
    title: "Skills",
    dataIndex: "skills",
    render: (text: any, record: any) => <List max={4} emphasize={['aws']} emphasizeTitle={"matched"} showInTags data={text.map((i: any) => i)} />,
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      <ContextAction
        buttonType="primary"
        text="Enroll"
        tooltip="Enroll"
        queryService={QueryConstructor(() => CourseQueries.enroll({ data: { id: record.id } }), [CourseQueries.enroll])}
        refreshEventName="REFRESH_COURSE_LIST"
        confirmationType="Enroll to"
        buttonSize="small"
      />
    )
  }
]

export const getCourseListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: courseListTableColumns,
    searchFunc: CourseQueries.getPaginatedList,
    tableName: 'Course',
    refreshEventName: 'REFRESH_COURSE_LIST'
  }
}