import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getStudentDetailsMeta } from "~/TableSearchMeta/Student/StudentDetailsMeta"
import { StudentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Students"

export function StudentDetailsPage(props: RouteComponentProps<{ studentID?: string }>) {
  const StudentID = props?.match?.params?.studentID

  return <DetailsPage getMeta={getStudentDetailsMeta} getDetailsPageContent={StudentQueries.getSingle} entityType="student" entityID={StudentID} titleKey="transaction_request_id" />
}