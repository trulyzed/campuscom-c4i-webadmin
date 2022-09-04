import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"

export const getCourseListTableColumns = (isModal = false, CourseID?: number): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text: any, record: any) => renderLink(`/course-provider/course/${record.id}`, text, isModal),
      sorter: (a: any, b: any) => a.title - b.title
    },
    {
      title: "Course Provider",
      dataIndex: "course_provider",
      render: (text: any, record: any) =>
        renderLink(`/administration/course-provider/${text.id}`, text.name, isModal),
      sorter: (a: any, b: any) => {
        if (a.course_provider.name - b.course_provider.name) {
          return a.course_provider.name.length - b.course_provider.name.length
        }
        return 0
      }
    },
    {
      title: "Slug",
      dataIndex: "slug",
      sorter: (a: any, b: any) => a.slug.length - b.slug.length
    },
    {
      title: "Content Ready",
      dataIndex: "content_ready",
      render: (text: any, record: any) => renderBoolean(text)
    },
    {
      title: "Active Status",
      dataIndex: "active_status",
      render: (text: any, record: any) => renderBoolean(text)
    }
    // ,
    // {
    //   title: "Actions",
    //   dataIndex: "StatusCode"
    // }
  ]

  return {
    columns,
    searchFunc: CourseQueries.getPaginatedList,
    tableName: 'Course'
  }
}
