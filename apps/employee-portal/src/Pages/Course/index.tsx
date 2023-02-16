import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
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
        searchFunc: QueryConstructor((params) => CourseQueries.getPaginatedList(params).then(resp => {
          return {
            code: 200,
            data: [
              { id: "1dba9373-399e-43df-aafa-b29a14a38153", title: 'Education Research', skills: ['aws', 'javascript', 'python', 'nodejs', 'devops'] },
            ],
            error: false,
            success: true
          }
        }), [CourseQueries.getList]),
      }}
    />
  )
}
