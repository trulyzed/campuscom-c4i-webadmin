import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getERPLogDetailsMeta } from "~/TableSearchMeta/ERPLog/ERPLogDetailsMeta"
import { ERPLogQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ERPLogs"

export function ERPLogDetailsPage(props: RouteComponentProps<{ ERPLogID?: string }>) {
  const ERPLogID = props?.match?.params?.ERPLogID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getERPLogDetailsMeta} getDetailsPageContent={ERPLogQueries.getSingle} entityType="ERPLog" entityID={ERPLogID} />
}