import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getIdentityProviderDetailsMeta } from "~/TableSearchMeta/IdentityProvider/IdentityProviderDetailsMeta"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"

export function IdentityProviderDetailsPage(props: RouteComponentProps<{ identityProviderID?: string }>) {
  const IdentityProviderID = props?.match?.params?.identityProviderID

  return <DetailsPage getMeta={getIdentityProviderDetailsMeta} getDetailsPageContent={IdentityProviderQueries.getSingle} entityType="identityProvider" entityID={IdentityProviderID} titleKey="transaction_request_id" />
}