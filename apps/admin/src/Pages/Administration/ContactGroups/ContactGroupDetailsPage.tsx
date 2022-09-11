import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getContactGroupDetailsMeta } from "~/TableSearchMeta/ContactGroup/ContactGroupDetailsMeta"
import { ContactGroupQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ContactGroups"

export function ContactGroupDetailsPage(props: RouteComponentProps<{ contactGroupID?: string }>) {
  const ContactGroupID = props?.match?.params?.contactGroupID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getContactGroupDetailsMeta} getDetailsPageContent={ContactGroupQueries.getSingle} entityType="contactGroup" entityID={ContactGroupID} titleKey="transaction_request_id" />
}