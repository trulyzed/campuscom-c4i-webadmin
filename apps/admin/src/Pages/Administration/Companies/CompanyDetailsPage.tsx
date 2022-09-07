import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCompanyDetailsMeta } from "~/TableSearchMeta/Company/CompanyDetailsMeta"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"

export function CompanyDetailsPage(props: RouteComponentProps<{ companyID?: string }>) {
  const CompanyID = props?.match?.params?.companyID

  return <DetailsPage getMeta={getCompanyDetailsMeta} getDetailsPageContent={CompanyQueries.getSingle} entityType="company" entityID={CompanyID} titleKey="transaction_request_id" />
}