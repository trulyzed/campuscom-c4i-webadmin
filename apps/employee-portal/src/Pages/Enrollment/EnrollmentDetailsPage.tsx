import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getEnrollmentDetailsMeta } from "~/TableSearchMeta/Enrollment/EnrollmentDetailsMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

export function EnrollmentDetailsPage(props: RouteComponentProps<{ enrollmentID?: string }>) {
  const EnrollmentID = props?.match?.params?.enrollmentID

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
  }, [EnrollmentQueries.getSingleCourseEnrollment, OrderQueries.getSingle])

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getEnrollmentDetailsMeta} getDetailsPageContent={query} entityType="enrollment" entityID={EnrollmentID} titleKey="transaction_request_id" />
}