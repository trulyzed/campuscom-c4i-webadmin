import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getOrganizationTypeDetailsMeta } from "~/TableSearchMeta/OrganizationType/OrganizationTypeDetailsMeta"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"

export function OrganizationTypeDetailsPage(props: RouteComponentProps<{ organizationTypeID?: string }>) {
  const OrganizationTypeID = props?.match?.params?.organizationTypeID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getOrganizationTypeDetailsMeta} getDetailsPageContent={OrganizationTypeQueries.getSingle} entityType="organizationType" entityID={OrganizationTypeID} titleKey="name" />
}