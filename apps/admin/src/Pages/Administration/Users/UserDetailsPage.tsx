import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getUserDetailsMeta } from "~/TableSearchMeta/User/UserDetailsMeta"
import { UserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Users"

export function UserDetailsPage(props: RouteComponentProps<{ userID?: string }>) {
  const UserID = props?.match?.params?.userID

  return <DetailsPage breadcrumbDataIndex="username" getMeta={getUserDetailsMeta} getDetailsPageContent={UserQueries.getSingle} entityType="user" entityID={UserID} titleKey="transaction_request_id" />
}