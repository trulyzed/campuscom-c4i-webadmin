import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getContactGroupDetailsMeta } from "~/TableSearchMeta/ContactGroup/ContactGroupDetailsMeta"
import { ContactGroupQueries } from "~/packages/services/Api/Queries/AdminQueries/ContactGroups"

export function ContactGroupDetailsPage(props: RouteComponentProps<{ contactGroupID?: string }>) {
  const ContactGroupID = props?.match?.params?.contactGroupID

  return <DetailsPage getMeta={getContactGroupDetailsMeta} getDetailsPageContent={ContactGroupQueries.getSingle} entityType="contactGroup" entityID={ContactGroupID} titleKey="transaction_request_id" />
}