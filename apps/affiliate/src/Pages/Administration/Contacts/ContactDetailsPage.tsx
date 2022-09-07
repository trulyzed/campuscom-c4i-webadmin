import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getContactDetailsMeta } from "~/TableSearchMeta/Contact/ContactDetailsMeta"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AffiliateQueries/Contacts"

export function ContactDetailsPage(props: RouteComponentProps<{ contactID?: string }>) {
  const ContactID = props?.match?.params?.contactID

  return <DetailsPage getMeta={getContactDetailsMeta} getDetailsPageContent={ContactQueries.getSingle} entityType="contact" entityID={ContactID} titleKey="transaction_request_id" />
}