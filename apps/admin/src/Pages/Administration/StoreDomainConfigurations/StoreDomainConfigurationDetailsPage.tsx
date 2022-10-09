import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getStoreDomainConfigurationDetailsMeta } from "~/TableSearchMeta/StoreDomainConfiguration/StoreDomainConfigurationDetailsMeta"
import { StoreDomainConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/StoreDomainConfigurations"

export function StoreDomainConfigurationDetailsPage(props: RouteComponentProps<{ storeDomainConfigurationID?: string }>) {
  const StoreDomainConfigurationID = props?.match?.params?.storeDomainConfigurationID

  return <DetailsPage getMeta={getStoreDomainConfigurationDetailsMeta} getDetailsPageContent={StoreDomainConfigurationQueries.getSingle} entityType="storeDomainConfiguration" entityID={StoreDomainConfigurationID} titleKey="transaction_request_id" />
}