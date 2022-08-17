import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getQuestionDetailsMeta } from "~/TableSearchMeta/Question/QuestionDetailsMeta"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"

export function QuestionDetailsPage(props: RouteComponentProps<{ questionID?: string }>) {
  const QuestionID = props?.match?.params?.questionID

  return <DetailsPage getMeta={getQuestionDetailsMeta} getDetailsPageContent={QuestionQueries.getSingle} entityType="question" entityID={QuestionID} />
}