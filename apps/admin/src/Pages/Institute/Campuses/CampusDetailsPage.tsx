import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCampusDetailsMeta } from "~/TableSearchMeta/Campus/CampusDetailsMeta"
import { CampusQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Campuses"

export function CampusDetailsPage(props: RouteComponentProps<{ campusID?: string }>) {
  const CampusID = props?.match?.params?.campusID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getCampusDetailsMeta} getDetailsPageContent={CampusQueries.getSingle} entityType="campus" entityID={CampusID} titleKey="transaction_request_id" />
}