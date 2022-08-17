import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSectionDetailsMeta } from "~/TableSearchMeta/Section/SectionDetailsMeta"
import { SectionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Sections"

export function SectionDetailsPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = props?.match?.params?.sectionID

  return <DetailsPage getMeta={getSectionDetailsMeta} getDetailsPageContent={SectionQueries.getSingle} entityType="section" entityID={SectionID} titleKey="transaction_request_id" />
}