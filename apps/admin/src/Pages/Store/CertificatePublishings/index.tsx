import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getCertificatePublishingListTableColumns } from "~/TableSearchMeta/CertificatePublishing/PublishingListTableColumns"
import { getCertificatePublishingSearchMeta } from "~/TableSearchMeta/CertificatePublishing/CertificatePublishingSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Store Items - Certificate"}
      meta={getCertificatePublishingSearchMeta()}
      tableProps={getCertificatePublishingListTableColumns()}
    />
  )
}
