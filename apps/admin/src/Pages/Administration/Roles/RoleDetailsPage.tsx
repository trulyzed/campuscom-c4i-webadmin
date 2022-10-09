import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getRoleDetailsMeta } from "~/TableSearchMeta/Role/RoleDetailsMeta"
import { RoleQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Roles"

export function RoleDetailsPage(props: RouteComponentProps<{ roleID?: string }>) {
  const RoleID = props?.match?.params?.roleID

  return <DetailsPage getMeta={getRoleDetailsMeta} getDetailsPageContent={RoleQueries.getSingle} entityType="role" entityID={RoleID} titleKey="transaction_request_id" />
}