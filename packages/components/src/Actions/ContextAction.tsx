import { useCallback, useState } from "react"
import Text from "antd/lib/typography/Text"
import { promptConfirmation } from "~/Modal/Confirmation"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { Button, ButtonProps } from "antd"
import { useHistory } from "react-router-dom"

export type ActionType = 'changePassword' | 'close' | 'create' | 'delete' | 'download' | 'drop' | 'edit' | 'filter' | 'generateKey' | 'goToProfile' | 'makePayment' | 'mfa' |
  'next' | 'previous' | 'reload' | 'showHistory' | 'start' | 'swap'

interface IContextActionProps {
  text?: string
  tooltip: string
  type?: ActionType
  onClick?: (...args: any[]) => void
  queryService?: IQuery
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  redirectTo?: string
  textOnly?: boolean
  downloadAs?: "EXCEL" | "CSV"
  iconColor?: "primary" | "danger" | "warning"
  confirmationType?: string
  buttonType?: ButtonProps["type"]
}

const getIcon = (type: IContextActionProps["type"], iconColor?: IContextActionProps["iconColor"]): React.ReactNode => {
  if (!type) return
  const getIconClassName = (iconType: string, iconColor?: IContextActionProps['iconColor']) => {
    return `glyphicon ${iconType}${iconColor === "danger" ? " glyphicon--danger" : iconColor === "primary" ? " glyphicon--primary" : iconColor === "warning" ? " glyphicon--warning" : ""}`
  }
  const iconTypes = {
    changePassword: <span className={getIconClassName("glyphicon-key", iconColor)} />,
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
    mfa: < span className={getIconClassName("glyphicon-lock", iconColor)} />,
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
  type,
  confirmationType,
  refreshEventName,
  textOnly,
  redirectTo,
  downloadAs = 'EXCEL',
  iconColor,
  buttonType
}: IContextActionProps) => {
  const [processing, setIsProcessing] = useState(false)
  const { push } = useHistory()
  const icon = getIcon(type, iconColor)

  const refreshEvents = useCallback(() => {
    if (Array.isArray(refreshEventName)) {
      refreshEventName.forEach(i => {
        eventBus.publish(i)
      })
    } else if (typeof refreshEventName === "string") eventBus.publish(refreshEventName, {})
  }, [refreshEventName])

  const handleClick = useCallback(async () => {
    if ((confirmationType || type === 'delete') && queryService) {
      promptConfirmation(queryService, { actionType: confirmationType, setIsProcessing: (status) => setIsProcessing(status) }).then(() => {
        refreshEvents()
        redirectTo && push(redirectTo)
      })
    } else if (queryService) {
      setIsProcessing(true)
      queryService(type === 'download' ? { headers: { ResponseType: downloadAs === "CSV" ? "text/csv" : "application/vnd.ms-excel" } } : undefined).then(() => {
        refreshEvents()
      }).finally(() => setIsProcessing(false))
    } else if (onClick) { onClick() }
  }, [confirmationType, queryService, type, refreshEvents, onClick, push, redirectTo, downloadAs])

  return (
    (textOnly && text) ? <Text className="cursor-pointer" strong type={type === "delete" ? "danger" : undefined} onClick={handleClick}>{text}</Text>
      : <Button loading={processing} className="p-0 m-0" onClick={handleClick} type={buttonType || 'link'} icon={icon} title={tooltip} children={(text && icon) ? <span className="ml-5">{text}</span> : text !== undefined ? text : undefined} />
  )
}
