import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCertificatePublishingDetailsMeta } from "~/TableSearchMeta/CertificatePublishing/CertificatePublishingDetailsMeta"
import { CertificatePublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CertificatePublishings"

export function ReadyCertificatePublishingDetailsPage(props: RouteComponentProps<{ certificatePublishingID?: string }>) {
  const CertificatePublishingID = props?.match?.params?.certificatePublishingID

  return <DetailsPage breadcrumbDataIndex="certificate.title" getMeta={getCertificatePublishingDetailsMeta} getDetailsPageContent={CertificatePublishingQueries.getReadyType} entityType="certificatePublishing" entityID={CertificatePublishingID} titleKey="name" />
}