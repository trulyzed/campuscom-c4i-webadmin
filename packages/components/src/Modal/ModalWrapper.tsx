import { CSSProperties, ReactNode, useEffect, useRef } from "react"
import { Card, Col, Row } from "antd"
import { ContextAction } from "~/Actions/ContextAction"
import { Modal } from "./Modal"
import { zIndexLevel } from "~/zIndexLevel"
import { eventBus } from "@packages/utilities/lib/EventBus"

export interface IModalWrapperProps {
  children?: ReactNode
  title?: ReactNode
  content?: JSX.Element
  contentStyle?: CSSProperties
  closeHandlerEventName?: string | symbol
  actions?: ReactNode[]
  onClose?: () => void
  loading?: boolean
  focusOnClose?: boolean
}

export const ModalWrapper = ({
  children,
  title,
  content,
  contentStyle,
  closeHandlerEventName,
  actions,
  onClose,
  loading,
  focusOnClose,
}: IModalWrapperProps) => {
  const closeRef = useRef<HTMLElement>(null)
  // Listen for modal close event
  useEffect(() => {
    if (!closeHandlerEventName || !onClose) return
    eventBus.subscribe(closeHandlerEventName, onClose)
    return () => {
      if (closeHandlerEventName) eventBus.unsubscribe(closeHandlerEventName)
    }
  }, [closeHandlerEventName, onClose])

  useEffect(() => {
    if (focusOnClose) closeRef.current?.focus()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal closeModal={onClose} width="1000px" zIndex={zIndexLevel.defaultModal} style={contentStyle} apiCallInProgress={loading}>
      <Card
        title={
          <Row>
            <Col md={{ span: 22, order: 0 }} xs={{ span: 24, order: 1 }}>
              {typeof title === "string" ?
                <h2>{title}</h2>
                : title}
            </Col>
            <Col xs={{ span: 2, offset: 22, }} md={{ offset: 0 }} className={"text-right"}>
              <ContextAction ref={closeRef} tooltip="Close" type="close" iconColor="primary" onClick={onClose} />
            </Col>
          </Row>
        }
        bodyStyle={{ maxHeight: "65vh", overflowY: "auto" }}
        actions={actions?.length ? [
          <Row justify="end" gutter={[8, 8]} style={{
            padding: "10px",
          }}>
            {actions.map((i, idx) => (
              <Col key={idx}>{i}</Col>
            ))}
          </Row>
        ] : undefined}
      >{content || children}</Card>
    </Modal>
  )
}