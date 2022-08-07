import { useCallback } from "react"
import Text from "antd/lib/typography/Text"
import { showDeleteConfirm } from "~/packages/components/Modal/Confirmation"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { eventBus } from "~/packages/utils/EventBus"
import { Button } from "antd"
import { useHistory } from "react-router-dom"

type ActionType = 'edit' | 'delete' | 'generateKey' | 'start' | 'showHistory' | 'goToProfile'

interface IContextActionProps {
  text?: string
  tooltip: string
  type: ActionType
  onClick?: (...args: any[]) => void
  queryService?: IQuery
  refreshEventName?: string
  redirectTo?: string
  textOnly?: boolean
}

const iconTypes: Record<ActionType, React.ReactNode> = {
  edit: <span className="glyphicon glyphicon-edit" />,
  delete: <span className="glyphicon glyphicon--danger glyphicon-trash" />,
  generateKey: <span className="glyphicon glyphicon-key" />,
  start: <span className="glyphicon glyphicon-play-circle" />,
  showHistory: <span className="glyphicon glyphicon-time" />,
  goToProfile: <span className="glyphicon glyphicon-user" />,
}

export const ContextAction = ({
  text,
  tooltip,
  queryService,
  onClick,
  type = 'edit',
  refreshEventName,
  textOnly,
  redirectTo,
}: IContextActionProps) => {
  const { push } = useHistory()
  const handleClick = useCallback(() => {
    if (type === 'delete' && queryService) {
      showDeleteConfirm(queryService).then(() => {
        refreshEventName && eventBus.publish(refreshEventName)
        redirectTo && push(redirectTo)
      })
    } else if (onClick) { onClick() }
  }, [queryService, type, refreshEventName, onClick, push, redirectTo])

  return (
    (textOnly && text) ? <Text className="cursor-pointer" strong type={type === "delete" ? "danger" : undefined} onClick={handleClick}>{text}</Text>
      : <Button className="p-0 m-0" onClick={handleClick} type={'link'} icon={iconTypes[type]} title={tooltip} children={text ? <span className="ml-5">{text}</span> : undefined} />
  )
}