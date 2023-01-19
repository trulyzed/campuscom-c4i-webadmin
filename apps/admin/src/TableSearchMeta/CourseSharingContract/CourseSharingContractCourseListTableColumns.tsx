import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { NavigateTo } from "@packages/components/lib/Actions/NavigateTo"
import { renderBoolean, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CourseSharingContractQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseSharingContracts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { PublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Publishings"

export const courseSharingContractCourseListTableColumns: TableColumnType = [
  {
    title: "Title",
    dataIndex: "course",
    render: (text: any) => renderLink(`/course-provider/course/${text.id}`, text.title),
    sorter: (a: any, b: any) => a.course.title - b.course.title
  },
  {
    title: "Is Published",
    dataIndex: "is_published",
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_published - b.is_published
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      record.is_published ?
        <NavigateTo
          apiPermission={PublishingQueries.update}
          name={"Manage Publishing"}
          icon={<span className={"glyphicon glyphicon-edit mr-2"} />}
          path={`/store/publishing/course/${record.id}`}
          buttonType="ghost"
        />
        : <ContextAction
          type="delete"
          tooltip="Delete"
          queryService={QueryConstructor(() => CourseSharingContractQueries.deactivateStoreCourse({ data: { store_course: record.id } }), [CourseSharingContractQueries.deactivateStoreCourse])}
          refreshEventName="REFRESH_COURSE_SHARING_CONTRACT_COURSE_LIST"
        />
    )
  }
]

export const getCourseSharingContractCourseListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: courseSharingContractCourseListTableColumns,
    searchFunc: QueryConstructor((params) => CourseSharingContractQueries.getAvailableCourseList(params), [CourseSharingContractQueries.getAvailableCourseList]),
    tableName: 'CourseSharingContractCourse',
    refreshEventName: "REFRESH_COURSE_SHARING_CONTRACT_COURSE_LIST"
  }
}
