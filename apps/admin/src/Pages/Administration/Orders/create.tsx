import { CreatePage } from "~/packages/components/Page/CreatePage/CreatePage"
import { OrderQueries } from "~/packages/services/Api/Queries/AdminQueries/Orders"
import { getEnrollmentFormMeta } from "~/Component/Feature/Enrollments/FormMeta/EnrollmentFormMeta"

export const Create = () => {
  return (
    <CreatePage
      title={"Create Order"}
      meta={getEnrollmentFormMeta()}
      formSubmitApi={OrderQueries.create}
    />
  )
}
