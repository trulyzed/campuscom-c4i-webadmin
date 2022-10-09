import { Popover } from "antd"
import { CardContainer } from "~/Page/DetailsPage/DetailsPageInterfaces"
import { DetailsCardContainer } from "~/Page/DetailsPage/DetailsSummaryTab"



type SummaryTablePopoverProps = {
  card: CardContainer
  actionText?: string
}

export const SummaryTablePopover = ({ card = {}, actionText = 'View Details' }: SummaryTablePopoverProps) => {
  return (
    <Popover
      overlayClassName="view-details__modal-overlay"
      content={<DetailsCardContainer card={card} />}>
      <span className="view-details__action">{actionText}</span>
    </Popover>
  )
}