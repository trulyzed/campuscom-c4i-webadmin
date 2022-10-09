import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCompanyUserDetailsMeta } from "~/TableSearchMeta/CompanyUser/CompanyUserDetailsMeta"
import { CompanyUserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CompanyUsers"

export function CompanyUserDetailsPage(props: RouteComponentProps<{ companyUserID?: string }>) {
  const CompanyUserID = props?.match?.params?.companyUserID

  return <DetailsPage getMeta={getCompanyUserDetailsMeta} getDetailsPageContent={CompanyUserQueries.getSingle} entityType="companyUser" entityID={CompanyUserID} titleKey="transaction_request_id" />
}