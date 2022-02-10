import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { getCorrentSectionsTableColumns } from "~/TableSearchMeta/CurrentSection/CorrentSectionsTableColumns"

export const CurrentSections = () => {
  const Faculty: any = getUser()
  return <SearchPage initSearchAtMount defaultFormValue={{ FacultyID: Faculty.FacultyID, isCompletedSection: 0 }} title={"Current Sections"} tableProps={{ ...getCorrentSectionsTableColumns() }} />
}
