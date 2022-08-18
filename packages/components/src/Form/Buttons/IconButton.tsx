import React, { CSSProperties, useState } from "react"
import {
  ShoppingCartOutlined,
  //PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
  CopyOutlined,
  MailOutlined,
  UndoOutlined,
  InfoOutlined,
  RightOutlined,
  LeftOutlined,
  CreditCardOutlined,
  ExclamationOutlined,
  SettingOutlined,
  ReloadOutlined,
  DownOutlined,
  UpOutlined,
  CloudDownloadOutlined,
  QuestionOutlined,
  RollbackOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  HourglassOutlined,
  MoreOutlined,
  EllipsisOutlined,
  MergeCellsOutlined,
  KeyOutlined
} from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Modal/Confirmation"
import { IApiResponse } from "@packages/services/lib/Api/utils/Interfaces"
import { Redirect } from "react-router"
import { ButtonType } from "antd/lib/button"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { BulkOrderIcon } from "~/Svg/BulkOrderIcon"
import { BaseButtonProps } from "antd/lib/button/button"

export type iconType =
  | "cart"
  | "create"
  | "edit"
  | "remove"
  | "close"
  | "copy"
  | "email"
  | "undo"
  | "info"
  | "danger"
  | "filter"
  | "right"
  | "leftCircle"
  | "back"
  | "up"
  | "down"
  | "payment"
  | "error"
  | "update"
  | "history"
  | "search"
  | "settings"
  | "reload"
  | "download"
  | "question"
  | "return"
  | "refresh"
  | "run"
  | "check"
  | "process"
  | "more"
  | "profile"
  | "bulkOrder"
  | "actions"
  | "merge"
  | "key"

export const IconButton = (props: {
  onClick?: () => void
  onClickRemove?: () => Promise<IApiResponse>
  redirectTo?: string
  title?: string
  iconType: iconType
  inProgress?: boolean
  toolTip: string
  disabled?: boolean
  loading?: boolean
  style?: CSSProperties
  buttonType?: ButtonType
  refreshEventName?: string
  shape?: BaseButtonProps['shape']
  text?: string | JSX.Element
}) => {
  const [localLoading, setLocalLoading] = useState(false)
  const [redirectTo, setRedirectTo] = useState<string>()
  let _button: JSX.Element = <></>
  if (props.iconType === "remove") {
    _button = (
      <Button
        style={{ marginRight: "5px", ...props.style }}
        aria-label={props.toolTip}
        icon={<DeleteOutlined />}
        shape="circle"
        danger
        type="primary"
        onClick={() =>
          props.onClickRemove &&
          showDeleteConfirm(() => {
            if (props.onClickRemove) {
              setLocalLoading(true)
              return props.onClickRemove().then((x) => {
                setLocalLoading(false)
                if (x.success && props.refreshEventName) {
                  eventBus.publish(props.refreshEventName)
                }
                if (x.success && props.redirectTo) {
                  setRedirectTo(props.redirectTo)
                  setTimeout(() => {
                    setRedirectTo(undefined)
                  }, 0)
                }
                return x
              })
            }
            return Promise.resolve({
              code: 200,
              success: false,
              error: null,
              data: null
            })
          })
        }
        loading={props.loading || localLoading}
        disabled={props.disabled || (props.inProgress !== undefined && props.inProgress)}
      />
    )
  } else {
    const icons: { [key: string]: JSX.Element } = {
      cart: <ShoppingCartOutlined alt="" />,
      create: <span className={`glyphicon glyphicon-plus-sign${props.title ? " mr-5" : ""}`} aria-label="create" />,
      edit: <span className={`glyphicon glyphicon-edit${props.title ? " mr-5" : ""}`} aria-label="edit" />,
      close: <CloseOutlined alt="" />,
      copy: <CopyOutlined alt="" />,
      email: <MailOutlined alt="" />,
      undo: <UndoOutlined alt="" />,
      info: <InfoOutlined alt="" />,
      right: <RightOutlined alt="" />,
      leftCircle: <LeftOutlined alt="" />,
      back: <span className="glyphicon glyphicon-chevron-left" aria-label="back" />,
      down: <DownOutlined alt="" />,
      up: <UpOutlined alt="" />,
      danger: <span className="glyphicon glyphicon-trash" aria-label="danger" />,
      filter: <span className="glyphicon glyphicon-filter" aria-label="filter" />,
      payment: <CreditCardOutlined alt="" />,
      error: <ExclamationOutlined alt="" />,
      update: <SyncOutlined alt="" />,
      history: <span className="glyphicon glyphicon-time" aria-label="history" />,
      search: <span className="glyphicon glyphicon-search" aria-label="search" />,
      settings: <SettingOutlined alt="" />,
      reload: <ReloadOutlined alt="" />,
      download: <CloudDownloadOutlined alt="" />,
      question: <QuestionOutlined alt="" />,
      return: <RollbackOutlined alt="" />,
      refresh: <SyncOutlined alt="" />,
      run: <PlayCircleOutlined alt="" />,
      check: <CheckCircleOutlined alt="" />,
      process: <HourglassOutlined alt="" />,
      more: <MoreOutlined alt="" />,
      profile: <span className="glyphicon glyphicon-user" aria-label="profile" />,
      bulkOrder: <BulkOrderIcon alt="" />,
      actions: <EllipsisOutlined alt="" />,
      merge: <MergeCellsOutlined alt="" />,
      key: <KeyOutlined alt="" />,
    }
    _button = (
      <Button
        className={`${props.iconType === "create" ? "create-entity" : ""}`}
        style={{ ...props.style }}
        aria-label={props.toolTip}
        icon={icons[props.iconType]}
        shape={props.shape}
        danger={props.iconType === "danger" || props.iconType === "error"}
        onClick={() => {
          props.onClick && props.onClick()
          props.redirectTo && setRedirectTo(props.redirectTo)
        }}
        type={props.buttonType || "primary"}
        loading={props.loading}
        disabled={props.disabled}
      >{props.title}</Button>
    )
  }
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      {props.text} <Tooltip title={props.toolTip}>{_button}</Tooltip>
    </>
  )
}
