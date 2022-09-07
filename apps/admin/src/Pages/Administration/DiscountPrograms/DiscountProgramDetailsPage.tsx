import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getDiscountProgramDetailsMeta } from "~/TableSearchMeta/DiscountProgram/DiscountProgramDetailsMeta"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"

export function DiscountProgramDetailsPage(props: RouteComponentProps<{ discountProgramID?: string }>) {
  const DiscountProgramID = props?.match?.params?.discountProgramID

  return <DetailsPage getMeta={getDiscountProgramDetailsMeta} getDetailsPageContent={DiscountProgramQueries.getSingle} entityType="discountProgram" entityID={DiscountProgramID} titleKey="transaction_request_id" />
}