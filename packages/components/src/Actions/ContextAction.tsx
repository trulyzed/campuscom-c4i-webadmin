import { useCallback, useEffect, useState } from "react"
import Text from "antd/lib/typography/Text"
import { promptConfirmation } from "~/Modal/Confirmation"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { eventBus, triggerEvents } from "@packages/utilities/lib/EventBus"
import { Button, ButtonProps, } from "antd"
import { useHistory } from "react-router-dom"
import { Modal } from "~/Modal/Modal"
import { zIndexLevel } from "~/zIndexLevel"

export type ActionType = 'add' | 'changePassword' | 'close' | 'copy' | 'create' | 'delete' | 'download' | 'drop' | 'edit' | 'filter' | 'generateKey' | 'goToProfile' | 'makePayment' | 'mfa' |
  'next' | 'previous' | 'reload' | 'remove' | 'search' | 'showHistory' | 'shuffle' | 'start' | 'swap' | 'transfer'

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
  iconColor?: "success" | "primary" | "danger" | "warning"
  confirmationType?: string
  buttonType?: ButtonProps["type"]
  modalContent?: JSX.Element
  modalCloseEventName?: string | symbol
}

const getIcon = (type: IContextActionProps["type"], iconColor?: IContextActionProps["iconColor"]): React.ReactNode => {
  if (!type) return
  const getIconClassName = (iconType: string, iconColor?: IContextActionProps['iconColor']) => {
    return `glyphicon ${iconType}${iconColor === "success" ? " glyphicon--success" : iconColor === "danger" ? " glyphicon--danger" : iconColor === "primary" ? " glyphicon--primary" : iconColor === "warning" ? " glyphicon--warning" : ""}`
  }
  const iconTypes = {
    add: <span className={getIconClassName("glyphicon-plus-sign", iconColor)} />,
    changePassword: <span className={getIconClassName("glyphicon-key", iconColor)} />,
    close: <span className={getIconClassName("glyphicon-remove", iconColor)} />,
    copy: <span className={getIconClassName("glyphicon-copy", iconColor)} />,
    create: <span className={getIconClassName("glyphicon-plus-sign", iconColor)} />,
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
  buttonType,
  modalContent,
  modalCloseEventName,
}: IContextActionProps) => {
  const [processing, setIsProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { push } = useHistory()
  const icon = getIcon(type, iconColor)

  useEffect(() => {
    if (modalContent && modalCloseEventName) {
      eventBus.subscribe(modalCloseEventName, () => setShowModal(false))
      return () => eventBus.unsubscribe(modalCloseEventName)
    }
  }, [modalContent, modalCloseEventName])

  const handleClick = useCallback(async () => {
    if ((confirmationType || type === 'delete' || type === 'remove') && queryService) {
      promptConfirmation(queryService, { actionType: confirmationType, setIsProcessing: (status) => setIsProcessing(status) }).then(() => {
        if (refreshEventName) triggerEvents(refreshEventName)
        redirectTo && push(redirectTo)
      })
    } else if (queryService) {
      setIsProcessing(true)
      queryService(type === 'download' ? { headers: { ResponseType: downloadAs === "CSV" ? "text/csv" : "application/vnd.ms-excel" } } : undefined).then(() => {
        if (refreshEventName) triggerEvents(refreshEventName)
      }).finally(() => setIsProcessing(false))
    } else if (onClick) {
      onClick()
    } else if (modalContent) {
      setShowModal(true)
    }
  }, [confirmationType, queryService, type, refreshEventName, onClick, push, redirectTo, downloadAs, modalContent])

  return (
    <>
      {
        (textOnly && text) ? <Text className="cursor-pointer" strong type={type === "delete" ? "danger" : undefined} onClick={handleClick}>{text}</Text>
          : <Button loading={processing} className="p-0 m-0" onClick={handleClick} type={buttonType || 'link'} icon={icon} title={tooltip} children={(text && icon) ? <span className="ml-5">{text}</span> : text !== undefined ? text : undefined} />
      }
      {(showModal && modalContent) ?
        <Modal closeModal={() => setShowModal(false)} width="1000px" zIndex={zIndexLevel.defaultModal}>
          <div style={{ backgroundColor: "white", position: "relative", padding: "0 24px" }}>
            {modalContent}
            <div style={{ position: "absolute", right: "24px", top: "12px", }}>
              <ContextAction tooltip="Close" type="close" iconColor="primary" onClick={() => setShowModal(false)} />
            </div>
          </div>
        </Modal>
        : null}
    </>
  )
}
