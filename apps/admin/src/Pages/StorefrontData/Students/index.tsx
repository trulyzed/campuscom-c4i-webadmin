import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getStudentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns"
import { StudentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Students"}
      meta={StudentSearchMeta}
      tableProps={getStudentListTableColumns()}
    />
  )
}
