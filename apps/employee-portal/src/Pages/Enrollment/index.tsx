import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { useBalanceInfo } from "~/Component/Feature/BalanceInfo/useBalanceInfo"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentSearchMeta } from "~/TableSearchMeta/Enrollment/EnrollmentSearchMeta"

export const List = () => {
  const { balance, isProcessing } = useBalanceInfo()
  return (
    <SearchPage
      title={'Enrollments'}
      mainTitle={"Enrollments"}
      tableTitle={`Enrollments${isProcessing ? "" : `- Balance(${renderAmount(balance)})`}`}
      meta={EnrollmentSearchMeta}
      tableProps={{
        ...getEnrollmentListTableColumns(),
      }}
    />
  )
}
