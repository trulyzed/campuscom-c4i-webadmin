import { forwardRef, useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, ButtonProps, notification, } from "antd"
import Text from "antd/lib/typography/Text"
import { promptConfirmation } from "~/Modal/Confirmation"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { triggerEvents } from "@packages/utilities/lib/EventBus"
import { IModalWrapperProps, ModalWrapper } from "~/Modal/ModalWrapper"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"

export type ActionType = 'add' | 'approve' | 'changePassword' | 'close' | 'copy' | 'create' | 'deactivate' | 'delete' | 'download' | 'drop' | 'edit' | 'filter' | 'generateKey' | 'goToProfile' | 'makePayment' | 'mfa' |
  'next' | 'pay' | 'previous' | 'reload' | 'remove' | 'search' | 'showHistory' | 'shuffle' | 'start' | 'swap' | 'transfer'

export interface IContextActionProps {
  text?: string
  tooltip: string
  type?: ActionType
  onClick?: (...args: any[]) => void
  queryService?: IQuery
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
  redirectTo?: string
  textOnly?: boolean
  downloadAs?: "EXCEL" | "CSV"
  iconColor?: "success" | "primary" | "danger" | "warning"
  confirmationType?: string
  buttonType?: ButtonProps["type"]
  modalProps?: IModalWrapperProps
  successText?: string
  disableLoading?: boolean
}

const getIcon = (type: IContextActionProps["type"], iconColor?: IContextActionProps["iconColor"]): React.ReactNode => {
  if (!type) return
  const getIconClassName = (iconType: string, iconColor?: IContextActionProps['iconColor']) => {
    return `glyphicon ${iconType}${iconColor === "success" ? " glyphicon--success" : iconColor === "danger" ? " glyphicon--danger" : iconColor === "primary" ? " glyphicon--primary" : iconColor === "warning" ? " glyphicon--warning" : ""}`
  }
  const iconTypes = {
    add: <span className={getIconClassName("glyphicon-plus-sign", iconColor)} />,
    approve: <span className={getIconClassName("glyphicon-approve-circle", iconColor)} />,
    changePassword: <span className={getIconClassName("glyphicon-key", iconColor)} />,
    close: <span className={getIconClassName("glyphicon-remove", iconColor)} />,
    copy: <span className={getIconClassName("glyphicon-copy", iconColor)} />,
    create: <span className={getIconClassName("glyphicon-plus-sign", iconColor)} />,
    deactivate: <span className={getIconClassName("glyphicon--warning glyphicon-ban-circle", iconColor)} />,
    delete: <span className={getIconClassName("glyphicon--danger glyphicon-trash", iconColor)} />,
    download: <span className={getIconClassName("glyphicon-floppy-save", iconColor)} />,
    drop: <span className={getIconClassName("glyphicon-remove-sign", iconColor)} />,
    edit: <span className={getIconClassName("glyphicon-edit", iconColor)} />,
    filter: <span className={getIconClassName("glyphicon-filter", iconColor)} />,
    generateKey: <span className={getIconClassName("glyphicon-key", iconColor)} />,
    goToProfile: <span className={getIconClassName("glyphicon-user", iconColor)} />,
    makePayment: <span className={getIconClassName("glyphicon-payment", iconColor)} />,
    mfa: < span className={getIconClassName("glyphicon-lock", iconColor)} />,
    next: <span className={getIconClassName("glyphicon-chevron-right", iconColor)} />,
    pay: <span className={getIconClassName("glyphicon-dollar", iconColor)} />,
    previous: <span className={getIconClassName("glyphicon-chevron-left", iconColor)} />,
    reload: <span className={getIconClassName("glyphicon-repeat", iconColor)} />,
    remove: <span className={getIconClassName("glyphicon-remove-sign", iconColor)} />,
    search: <span className={getIconClassName("glyphicon-search", iconColor)} />,
    showHistory: <span className={getIconClassName("glyphicon-time", iconColor)} />,
    shuffle: <span className={getIconClassName("glyphicon-random", iconColor)} />,
    start: <span className={getIconClassName("glyphicon-play-circle", iconColor)} />,
    swap: <span className={getIconClassName("glyphicon-swap", iconColor)} />,
    transfer: <span className={getIconClassName("glyphicon-transfer", iconColor)} />,
  }
  return iconTypes[type]
}

export const ContextAction = forwardRef<HTMLElement, IContextActionProps>(({
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
  buttonType,
  modalProps,
  successText,
  disableLoading,
}: IContextActionProps, ref) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { push } = useHistory()
  const icon = getIcon(type, iconColor)

  const handleClick = useCallback(async () => {
    if ((confirmationType || type === 'delete' || type === 'remove') && queryService) {
      promptConfirmation(queryService, {
        actionType: confirmationType,
        setIsProcessing: (status) => setIsProcessing(status),
        success: successText
      }).then(() => {
        if (refreshEventName) triggerEvents(refreshEventName)
        redirectTo && push(redirectTo)
      })
    } else if (queryService) {
      setIsProcessing(true)
      queryService(type === 'download' ? { headers: { ResponseType: downloadAs === "CSV" ? "text/csv" : "application/vnd.ms-excel" } } : undefined).then((resp) => {
        if (resp.success && successText) notification.success({ message: successText })
        if (refreshEventName) triggerEvents(refreshEventName)
      }).finally(() => setIsProcessing(false))
    } else if (onClick) {
      setIsProcessing(true)
      await onClick()
      setIsProcessing(false)
    } else if (modalProps) {
      setShowModal(true)
    }
  }, [confirmationType, queryService, type, refreshEventName, onClick, push, redirectTo, downloadAs, modalProps, successText])

  const handleModalClose = useCallback(() => {
    setShowModal(false)
    modalProps?.onClose?.()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {(!queryService || checkAdminApiPermission(queryService)) &&
        <>
          {(textOnly && text) ? <Text ref={ref} className="cursor-pointer" strong type={type === "delete" ? "danger" : undefined} onClick={handleClick}>{text}</Text>
            : <Button
              ref={ref}
              className="p-0 m-0"
              style={{ display: 'inline-flex', justifyContent: 'center' }}
              title={tooltip}
              type={buttonType || 'link'}
              icon={icon}
              onClick={handleClick}
              loading={disableLoading ? undefined : isProcessing}
              children={(text && icon) ? <span className="ml-5">{text}</span> : text !== undefined ? text : undefined}
            />}
        </>
      }
      {(showModal && modalProps) ?
        <ModalWrapper {...modalProps} onClose={handleModalClose} />
        : null}
    </>
  )
})