import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getEnrollmentDetailsMeta } from "~/TableSearchMeta/Enrollment/EnrollmentDetailsMeta"
import { EnrollmentQueries } from "~/packages/services/Api/Queries/AdminQueries/Enrollments"

export function CourseEnrollmentDetailsPage(props: RouteComponentProps<{ courseEnrollmentID?: string }>) {
  const EnrollmentID = props?.match?.params?.courseEnrollmentID

  return <DetailsPage getMeta={getEnrollmentDetailsMeta} getDetailsPageContent={EnrollmentQueries.getSingleCourseEnrollment} entityType="enrollment" entityID={EnrollmentID} titleKey="transaction_request_id" />
}