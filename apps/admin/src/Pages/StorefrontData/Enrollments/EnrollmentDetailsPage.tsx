import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getEnrollmentDetailsMeta } from "~/TableSearchMeta/Enrollment/EnrollmentDetailsMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"

export function EnrollmentDetailsPage(props: RouteComponentProps<{ enrollmentID?: string }>) {
  const EnrollmentID = props?.match?.params?.enrollmentID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getEnrollmentDetailsMeta} getDetailsPageContent={EnrollmentQueries.getSingleCourseEnrollment} entityType="enrollment" entityID={EnrollmentID} titleKey="transaction_request_id" />
}