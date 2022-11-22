import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPendingEnrollmentDetailsMeta } from "~/TableSearchMeta/PendingEnrollment/PendingEnrollmentDetailsMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

export function PendingEnrollmentDetailsPage(props: RouteComponentProps<{ pendingEnrollmentID?: string }>) {
  const PendingEnrollmentID = props?.match?.params?.pendingEnrollmentID
  const query = QueryConstructor(async (params) => {
    const resp = await EnrollmentQueries.getSingleCourseEnrollment(params)
    const resp2 = (resp.success && resp.data.cart) ? await OrderQueries.getSingle({ params: { id: resp.data.cart?.id } }) : undefined
    return {
      ...resp,
      data: {
        ...resp.data,
        ...resp2?.success && { registration_details: resp2?.data.registration_details }
      }
    }
  }, [EnrollmentQueries.getSingleCourseEnrollment])

  return <DetailsPage breadcrumbDataIndex="course.title" getMeta={getPendingEnrollmentDetailsMeta} getDetailsPageContent={query} entityType="enrollment" entityID={PendingEnrollmentID} titleKey="transaction_request_id" />
}