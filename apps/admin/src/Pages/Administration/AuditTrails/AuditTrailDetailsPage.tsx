import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getAuditTrailDetailsMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailDetailsMeta"
import { AuditTrailQueries } from "@packages/services/lib/Api/Queries/AdminQueries/AuditTrails"

export function AuditTrailDetailsPage(props: RouteComponentProps<{ auditTrailID?: string }>) {
  const AuditTrailID = props?.match?.params?.auditTrailID

  return <DetailsPage breadcrumbDataIndex="ref_id" getMeta={getAuditTrailDetailsMeta} getDetailsPageContent={AuditTrailQueries.getSingle} entityType="auditTrail" entityID={AuditTrailID} titleKey="transaction_request_id" />
}