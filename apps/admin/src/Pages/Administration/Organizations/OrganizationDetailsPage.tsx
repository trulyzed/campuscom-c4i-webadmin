import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getOrganizationDetailsMeta } from "~/TableSearchMeta/Organization/OrganizationDetailsMeta"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"

export function OrganizationDetailsPage(props: RouteComponentProps<{ organizationID?: string }>) {
  const OrganizationID = props?.match?.params?.organizationID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getOrganizationDetailsMeta} getDetailsPageContent={OrganizationQueries.getSingle} entityType="organization" entityID={OrganizationID} titleKey="name" />
}