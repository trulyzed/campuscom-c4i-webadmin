import { CreatePage } from "~/packages/components/Page/CreatePage/CreatePage"
import { EnrollmentQueries } from "~/packages/services/Api/Queries/AdminQueries/Enrollments"
import { getEnrollmentFormMeta } from "~/Component/Feature/Enrollments/FormMeta/EnrollmentFormMeta"

export const Create = () => {
  return (
    <CreatePage
      title={"Create Order"}
      meta={getEnrollmentFormMeta()}
      formSubmitApi={EnrollmentQueries.getList}
    />
  )
}
