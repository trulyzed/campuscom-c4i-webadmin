import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getQuestionDetailsMeta } from "~/TableSearchMeta/Question/QuestionDetailsMeta"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { convertToString } from "@packages/utilities/lib/mapper"

export function QuestionDetailsPage(props: RouteComponentProps<{ questionID?: string }>) {
  const QuestionID = props?.match?.params?.questionID

  const query = QueryConstructor((params) => QuestionQueries.getSingle(params).then(resp => resp.success ? ({
    ...resp,
    data: { ...resp.data, title2: convertToString(resp.data.title, true) }
  }) : resp), [QuestionQueries.getSingle])

  return <DetailsPage breadcrumbDataIndex="title2" getMeta={getQuestionDetailsMeta} getDetailsPageContent={query} entityType="question" entityID={QuestionID} />
}