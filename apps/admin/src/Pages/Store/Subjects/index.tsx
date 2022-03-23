import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { SubjectSearchMeta } from "~/TableSearchMeta/Subject/SubjectSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Subjects"}
      meta={SubjectSearchMeta}
      tableProps={getSubjectListTableColumns()}
    />
  )
}
