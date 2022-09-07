import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSubjectDetailsMeta } from "~/TableSearchMeta/Subject/SubjectDetailsMeta"
import { SubjectQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Subjects"

export function SubjectDetailsPage(props: RouteComponentProps<{ subjectID?: string }>) {
  const SubjectID = props?.match?.params?.subjectID

  return <DetailsPage getMeta={getSubjectDetailsMeta} getDetailsPageContent={SubjectQueries.getSingle} entityType="subject" entityID={SubjectID} titleKey="name" />
}