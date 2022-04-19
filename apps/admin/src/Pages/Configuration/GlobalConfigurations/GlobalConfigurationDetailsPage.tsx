import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getGlobalConfigurationDetailsMeta } from "~/TableSearchMeta/GlobalConfiguration/GlobalConfigurationDetailsMeta"
import { GlobalConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/GlobalConfigurations"

export function GlobalConfigurationDetailsPage(props: RouteComponentProps<{ globalConfigurationID?: string }>) {
  const GlobalConfigurationID = props?.match?.params?.globalConfigurationID

  return <DetailsPage getMeta={getGlobalConfigurationDetailsMeta} getDetailsPageContent={GlobalConfigurationQueries.getSingle} entityType="globalConfiguration" entityID={GlobalConfigurationID} titleKey="transaction_request_id" />
}