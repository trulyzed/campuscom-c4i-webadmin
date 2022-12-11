import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getPendingEnrollmentListTableColumns } from "~/TableSearchMeta/PendingEnrollment/PendingEnrollmentListTableColumns"
import { PendingEnrollmentSearchMeta } from "~/TableSearchMeta/PendingEnrollment/PendingEnrollmentSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Pending Approvals"}
      meta={PendingEnrollmentSearchMeta}
      tableProps={{
        ...getPendingEnrollmentListTableColumns(),
      }}
    />
  )
}
