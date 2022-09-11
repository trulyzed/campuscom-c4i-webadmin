import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPublishingDetailsMeta } from "~/TableSearchMeta/Publishing/PublishingDetailsMeta"
import { PublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Publishings"

export function PublishingDetailsPage(props: RouteComponentProps<{ publishingID?: string }>) {
  const PublishingID = props?.match?.params?.publishingID

  return <DetailsPage breadcrumbDataIndex="course.title" getMeta={getPublishingDetailsMeta} getDetailsPageContent={PublishingQueries.getSingleWithTaggedSubjects} entityType="publishing" entityID={PublishingID} titleKey="name" />
}