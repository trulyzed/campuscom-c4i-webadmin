import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { getCompletedSectionsTableColumns } from "~/TableSearchMeta/CompletedSection/CompletedSectionsTableColumns"

export const CompletedSections = () => {
  const Faculty: any = getUser()
  return (
    <SearchPage
      initSearchAtMount
      defaultFormValue={{ FacultyID: Faculty.FacultyID, isCompletedSection: 1, SectionStatusCodeID: 4 }}
      title={"Completed Sections"}
      tableProps={{ ...getCompletedSectionsTableColumns() }}
    />
  )
}
