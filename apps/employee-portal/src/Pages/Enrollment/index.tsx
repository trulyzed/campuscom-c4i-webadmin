import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentSearchMeta } from "~/TableSearchMeta/Enrollment/EnrollmentSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Enrollments"}
      meta={EnrollmentSearchMeta}
      tableProps={{
        ...getEnrollmentListTableColumns(),
      }}
    />
  )
}
