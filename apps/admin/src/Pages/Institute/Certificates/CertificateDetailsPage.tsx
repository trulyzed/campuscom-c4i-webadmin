import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCertificateDetailsMeta } from "~/TableSearchMeta/Certificate/CertificateDetailsMeta"
import { CertificateQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Certificates"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export function CertificateDetailsPage(props: RouteComponentProps<{ certificateID?: string }>) {
  const CertificateID = props?.match?.params?.certificateID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getCertificateDetailsMeta} getDetailsPageContent={QueryConstructor(() => CertificateQueries.getSingle({ params: { id: CertificateID } }), [CertificateQueries.getSingle])} entityType="certificate" entityID={CertificateID} titleKey="name" />
}