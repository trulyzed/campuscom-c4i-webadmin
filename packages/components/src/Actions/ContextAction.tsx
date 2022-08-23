import { useCallback, useState } from "react"
import Text from "antd/lib/typography/Text"
import { showDeleteConfirm } from "~/Modal/Confirmation"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { Button } from "antd"
import { useHistory } from "react-router-dom"

export type ActionType = 'create' | 'delete' | 'download' | 'drop' | 'edit' | 'filter' | 'generateKey' | 'goToProfile' | 'makePayment' | 'next'
  | 'previous' | 'reload' | 'showHistory' | 'start' | 'swap'

interface IContextActionProps {
  text?: string
  tooltip: string
  type: ActionType
  onClick?: (...args: any[]) => void
  queryService?: IQuery
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  redirectTo?: string
  textOnly?: boolean
  downloadAs?: "EXCEL" | "CSV"
}

const iconTypes: Record<ActionType, React.ReactNode> = {
  create: <span className="glyphicon glyphicon-plus-sign" />,
  delete: <span className="glyphicon glyphicon--danger glyphicon-trash" />,
  download: <span className="glyphicon glyphicon-floppy-save" />,
  drop: <span className="glyphicon glyphicon--danger glyphicon-ban-circle" />,
  edit: <span className="glyphicon glyphicon-edit" />,
  filter: <span className="glyphicon glyphicon-filter" />,
  generateKey: <span className="glyphicon glyphicon-key" />,
  goToProfile: <span className="glyphicon glyphicon-user" />,
  makePayment: <span className="glyphicon glyphicon-payment" />,
  next: <span className="glyphicon glyphicon-chevron-right" />,
  previous: <span className="glyphicon glyphicon-chevron-left" />,
  reload: <span className="glyphicon glyphicon-repeat" />,
  showHistory: <span className="glyphicon glyphicon-time" />,
  start: <span className="glyphicon glyphicon-play-circle" />,
  swap: <span className="glyphicon glyphicon-random" />,
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
  downloadAs = 'EXCEL'
}: IContextActionProps) => {
  const [processing, setIsProcessing] = useState(false)
  const { push } = useHistory()

  const handleClick = useCallback(async () => {
    if (type === 'delete' && queryService) {
      showDeleteConfirm(queryService, { setIsProcessing: (status) => setIsProcessing(status) }).then(() => {
        if (Array.isArray(refreshEventName)) {
          refreshEventName.forEach(i => {
            eventBus.publish(i)
          })
        } else if (typeof refreshEventName === "string") eventBus.publish(refreshEventName, {})
        redirectTo && push(redirectTo)
      })
    } else if (type === 'download' && queryService) {
      setIsProcessing(true)
      await queryService({ headers: { ResponseType: downloadAs === "CSV" ? "text/csv" : "application/vnd.ms-excel" } })
      setIsProcessing(false)
    } else if (onClick) { onClick() }
  }, [queryService, type, refreshEventName, onClick, push, redirectTo, downloadAs])

  return (
    (textOnly && text) ? <Text className="cursor-pointer" strong type={type === "delete" ? "danger" : undefined} onClick={handleClick}>{text}</Text>
      : <Button loading={processing} className="p-0 m-0" onClick={handleClick} type={'link'} icon={iconTypes[type]} title={tooltip} children={text ? <span className="ml-5">{text}</span> : undefined} />
  )
}