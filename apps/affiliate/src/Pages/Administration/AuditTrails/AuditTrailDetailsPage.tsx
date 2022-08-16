import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getAuditTrailDetailsMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailDetailsMeta"
import { AuditTrailQueries } from "~/packages/services/Api/Queries/AdminQueries/AuditTrails"

export function AuditTrailDetailsPage(props: RouteComponentProps<{ auditTrailID?: string }>) {
  const AuditTrailID = props?.match?.params?.auditTrailID

  return <DetailsPage getMeta={getAuditTrailDetailsMeta} getDetailsPageContent={AuditTrailQueries.getSingle} entityType="auditTrail" entityID={AuditTrailID} titleKey="transaction_request_id" />
}