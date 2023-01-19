import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCareerDetailsMeta } from "~/TableSearchMeta/Career/CareerDetailsMeta"
import { CareerQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Careers"

export function CareerDetailsPage(props: RouteComponentProps<{ careerID?: string }>) {
  const CareerID = props?.match?.params?.careerID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getCareerDetailsMeta} getDetailsPageContent={CareerQueries.getSingle} entityType="career" entityID={CareerID} titleKey="transaction_request_id" />
}