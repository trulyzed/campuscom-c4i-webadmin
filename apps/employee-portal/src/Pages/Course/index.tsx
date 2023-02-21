import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { CourseQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Courses"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseSearchMeta } from "~/TableSearchMeta/Course/CourseSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Courses"}
      meta={CourseSearchMeta}
      tableProps={{
        ...getCourseListTableColumns(),
        searchFunc: CourseQueries.getPaginatedList,
      }}
    />
  )
}
