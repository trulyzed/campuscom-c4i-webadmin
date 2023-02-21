import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentSearchMeta } from "~/TableSearchMeta/Enrollment/EnrollmentSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={`Enrollments- Balance(${renderAmount(0)})`}
      mainTitle={"Enrollments"}
      searchTitle={"Enrollments- Filter"}
      meta={EnrollmentSearchMeta}
      tableProps={{
        ...getEnrollmentListTableColumns(),
      }}
    />
  )
}
