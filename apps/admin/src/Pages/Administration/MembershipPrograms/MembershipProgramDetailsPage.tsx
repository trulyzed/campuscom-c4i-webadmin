import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getMembershipProgramDetailsMeta } from "~/TableSearchMeta/MembershipProgram/MembershipProgramDetailsMeta"
import { MembershipProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/MembershipPrograms"

export function MembershipProgramDetailsPage(props: RouteComponentProps<{ membershipProgramID?: string }>) {
  const MembershipProgramID = props?.match?.params?.membershipProgramID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getMembershipProgramDetailsMeta} getDetailsPageContent={MembershipProgramQueries.getSingle} entityType="membershipProgram" entityID={MembershipProgramID} titleKey="transaction_request_id" />
}