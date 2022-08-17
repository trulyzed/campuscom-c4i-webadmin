import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getInstructorDetailsMeta } from "~/TableSearchMeta/Instructor/InstructorDetailsMeta"
import { InstructorQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Instructors"

export function InstructorDetailsPage(props: RouteComponentProps<{ instructorID?: string }>) {
  const InstructorID = props?.match?.params?.instructorID

  return <DetailsPage getMeta={getInstructorDetailsMeta} getDetailsPageContent={InstructorQueries.getSingle} entityType="instructor" entityID={InstructorID} titleKey="transaction_request_id" />
}