import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Instructors"}
      meta={InstructorSearchMeta}
      tableProps={getInstructorListTableColumns()}
    />
  )
}
