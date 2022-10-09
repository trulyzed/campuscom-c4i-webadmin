import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCourseSharingContractDetailsMeta } from "~/TableSearchMeta/CourseSharingContract/CourseSharingContractDetailsMeta"
import { CourseSharingContractQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseSharingContracts"

export function CourseSharingContractDetailsPage(props: RouteComponentProps<{ courseSharingContractID?: string }>) {
  const CourseSharingContractID = props?.match?.params?.courseSharingContractID

  return <DetailsPage getMeta={getCourseSharingContractDetailsMeta} getDetailsPageContent={CourseSharingContractQueries.getSingle} entityType="courseSharingContract" entityID={CourseSharingContractID} titleKey="transaction_request_id" />
}