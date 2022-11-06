import { Popover } from "antd"
import { CardContainer } from "~/Page/DetailsPage/DetailsPageInterfaces"
import { DetailsCardContainer } from "~/Page/DetailsPage/DetailsSummaryTab"

type PopoverSummaryTableProps = {
  card: CardContainer
  actionText?: string
}

export const PopoverSummaryTable = ({ card = {}, actionText = 'View Details' }: PopoverSummaryTableProps) => {
  return (
    <Popover
      overlayClassName="view-details__modal-overlay"
      content={<DetailsCardContainer card={card} />}>
      <span className="view-details__action" style={{ verticalAlign: "middle" }}>
        {actionText}
        <span className="ml-6 glyphicon glyphicon-eye" />
      </span>
    </Popover>
  )
}