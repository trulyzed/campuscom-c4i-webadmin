import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCourseDetailsMeta } from "~/TableSearchMeta/Course/CourseDetailsMeta"
import { CourseQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Courses"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export function CourseDetailsPage(props: RouteComponentProps<{ courseID?: string }>) {
  const CourseID = props?.match?.params?.courseID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getCourseDetailsMeta} getDetailsPageContent={query} entityType="course" entityID={CourseID} titleKey="name" />
}

const query = QueryConstructor((params) => CourseQueries.getSingle(params).then(resp => {
  return {
    code: 200,
    data: {
      id: "1dba9373-399e-43df-aafa-b29a14a38153",
      title: 'Education Research'
    },
    error: false,
    success: true
  }
}), [CourseQueries.getList])