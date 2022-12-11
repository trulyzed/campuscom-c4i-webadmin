import { Button, Popover } from "antd"
import { CardContainer } from "~/Page/DetailsPage/DetailsPageInterfaces"
import { DetailsCardContainer } from "~/Page/DetailsPage/DetailsSummaryTab"

type PopoverSummaryTableProps = {
  card: CardContainer
  actionText?: string
  iconOnly?: boolean
}

export const PopoverSummaryTable = ({ card = {}, actionText = 'View Details', iconOnly }: PopoverSummaryTableProps) => {
  return (
    <Popover
      overlayClassName="view-details__modal-overlay"
      content={<DetailsCardContainer card={card} />}>
      {iconOnly ?
        <Button
          title={actionText}
          icon={<span className="view-details__action glyphicon glyphicon-eye" />}
          type={"text"}
        /> :
        <span className="view-details__action" style={{ verticalAlign: "middle" }}>
          {actionText}
          <span className="ml-6 glyphicon glyphicon-eye" />
        </span>
      }

    </Popover>
  )
}