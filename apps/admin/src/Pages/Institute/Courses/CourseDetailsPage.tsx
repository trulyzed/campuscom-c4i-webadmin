import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCourseDetailsMeta } from "~/TableSearchMeta/Course/CourseDetailsMeta"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export function CourseDetailsPage(props: RouteComponentProps<{ courseID?: string }>) {
  const CourseID = props?.match?.params?.courseID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getCourseDetailsMeta} getDetailsPageContent={QueryConstructor(() => CourseQueries.getSingle({ params: { id: CourseID } }), [CourseQueries.getSingle])} entityType="course" entityID={CourseID} titleKey="name" />
}