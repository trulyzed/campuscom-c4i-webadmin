import { useCallback, useState } from "react"
import Text from "antd/lib/typography/Text"
import { showDeleteConfirm } from "~/Modal/Confirmation"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { Button } from "antd"
import { useHistory } from "react-router-dom"

export type ActionType = 'close' | 'create' | 'delete' | 'download' | 'drop' | 'edit' | 'filter' | 'generateKey' | 'goToProfile' | 'makePayment' | 'next'
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
  iconColor?: "primary" | "danger"
}

const getIcon = (type: IContextActionProps["type"], iconColor?: IContextActionProps["iconColor"]): React.ReactNode => {
  const getIconClassName = (iconType: string, iconColor?: IContextActionProps['iconColor']) => {
    return `glyphicon ${iconType}${iconColor === "danger" ? " glyphicon--danger" : iconColor === "primary" ? " glyphicon--primary" : ""}`
  }
  const iconTypes = {
    close: <span className={getIconClassName("glyphicon-remove", iconColor)} />,
    create: <span className={getIconClassName("glyphicon-plus-sign", iconColor)} />,
    delete: <span className={getIconClassName("glyphicon--danger glyphicon-trash", iconColor)} />,
    download: <span className={getIconClassName("glyphicon-floppy-save", iconColor)} />,
    drop: <span className={getIconClassName("glyphicon--danger glyphicon-ban-circle", iconColor)} />,
    edit: <span className={getIconClassName("glyphicon-edit", iconColor)} />,
    filter: <span className={getIconClassName("glyphicon-filter", iconColor)} />,
    generateKey: <span className={getIconClassName("glyphicon-key", iconColor)} />,
    goToProfile: <span className={getIconClassName("glyphicon-user", iconColor)} />,
    makePayment: <span className={getIconClassName("glyphicon-payment", iconColor)} />,
    next: <span className={getIconClassName("glyphicon-chevron-right", iconColor)} />,
    previous: <span className={getIconClassName("glyphicon-chevron-left", iconColor)} />,
    reload: <span className={getIconClassName("glyphicon-repeat", iconColor)} />,
    showHistory: <span className={getIconClassName("glyphicon-time", iconColor)} />,
    start: <span className={getIconClassName("glyphicon-play-circle", iconColor)} />,
    swap: <span className={getIconClassName("glyphicon-random", iconColor)} />,
  }
  return iconTypes[type]
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
  downloadAs = 'EXCEL',
  iconColor
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
      : <Button loading={processing} className="p-0 m-0" onClick={handleClick} type={'link'} icon={getIcon(type, iconColor)} title={tooltip} children={text ? <span className="ml-5">{text}</span> : undefined} />
  )
}
