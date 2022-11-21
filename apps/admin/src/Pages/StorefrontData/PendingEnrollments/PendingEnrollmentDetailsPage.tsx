import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPendingEnrollmentDetailsMeta } from "~/TableSearchMeta/PendingEnrollment/PendingEnrollmentDetailsMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"

export function PendingEnrollmentDetailsPage(props: RouteComponentProps<{ pendingEnrollmentID?: string }>) {
  const PendingEnrollmentID = props?.match?.params?.pendingEnrollmentID

  return <DetailsPage breadcrumbDataIndex="course.title" getMeta={getPendingEnrollmentDetailsMeta} getDetailsPageContent={EnrollmentQueries.getSingleCourseEnrollment} entityType="enrollment" entityID={PendingEnrollmentID} titleKey="transaction_request_id" />
}