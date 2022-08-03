import { useCallback } from "react"
import Text from "antd/lib/typography/Text"
import { showDeleteConfirm } from "~/packages/components/Modal/Confirmation"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { eventBus } from "~/packages/utils/EventBus"
import { Button } from "antd"

type ActionType = 'edit' | 'delete'

interface IContextActionProps {
  text?: string
  type: ActionType
  queryService?: IQuery
  refreshEventName?: string
}

const iconTypes: Record<ActionType, React.ReactNode> = {
  edit: <span className="glyphicon glyphicon-edit" />,
  delete: <span className="glyphicon glyphicon--danger glyphicon-trash" />,
}

export const ContextAction = ({
  text,
  queryService,
  type = 'edit',
  refreshEventName
}: IContextActionProps) => {

  const handleClick = useCallback(() => {
    if (type === 'delete' && queryService) {
      showDeleteConfirm(queryService).then(() => {
        console.log(eventBus.eventListeners, refreshEventName)
        refreshEventName && eventBus.publish(refreshEventName)
      })
    }
  }, [queryService, type, refreshEventName])

  return (
    text ? <Text className="cursor-pointer" strong type="danger" onClick={handleClick}>{text}</Text>
      : <Button className="p-0 m-0" onClick={handleClick} type={'link'} icon={iconTypes[type]} />
  )
}