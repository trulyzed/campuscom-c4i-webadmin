import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCertificatePublishingDetailsMeta } from "~/TableSearchMeta/CertificatePublishing/CertificatePublishingDetailsMeta"
import { CertificatePublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CertificatePublishings"

export function CertificatePublishingDetailsPage(props: RouteComponentProps<{ certificatePublishingID?: string }>) {
  const CertificatePublishingID = props?.match?.params?.certificatePublishingID

  return <DetailsPage breadcrumbDataIndex="certificate.title" getMeta={getCertificatePublishingDetailsMeta} getDetailsPageContent={CertificatePublishingQueries.getSingle} entityType="certificatePublishing" entityID={CertificatePublishingID} titleKey="name" />
}