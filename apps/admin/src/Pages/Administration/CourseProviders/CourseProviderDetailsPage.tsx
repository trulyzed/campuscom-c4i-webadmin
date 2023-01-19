import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCourseProviderDetailsMeta } from "~/TableSearchMeta/CourseProvider/CourseProviderDetailsMeta"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"

export function CourseProviderDetailsPage(props: RouteComponentProps<{ courseProviderID?: string }>) {
  const CourseProviderID = props?.match?.params?.courseProviderID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getCourseProviderDetailsMeta} getDetailsPageContent={CourseProviderQueries.getSingle} entityType="courseProvider" entityID={CourseProviderID} titleKey="transaction_request_id" />
}