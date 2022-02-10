import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSectionDetailsMeta } from "~/TableSearchMeta/Section/SectionDetailsMeta"
import { findSectionInfoBySectionID as findSectionInfoBySectionIDs } from "~/ApiServices/Service/SectionService"
import { getUser } from "@packages/api/lib/utils/TokenStore"
export const REFRESH_GRADE_TAB = "REFRESH_GRADE_TAB"

export function CurrentSectionsDetailsPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const Faculty: any = getUser()

  return (
    <DetailsPage
      getMeta={getSectionDetailsMeta}
      getDetailsPageContent={function findSectionInfoBySectionID() {
        return findSectionInfoBySectionIDs({ SectionID, FacultyID: Faculty.FacultyID }).then((x) => {
          if (x.success) {
            x.data["IsCompletedSection"] = false
            return x
          }
          return x
        })
      }}
      refreshEventName={REFRESH_GRADE_TAB}
    />
  )
}
