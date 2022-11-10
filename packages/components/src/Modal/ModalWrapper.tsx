import { CSSProperties, ReactNode, useEffect } from "react"
import { Card, Col, Row } from "antd"
import { ContextAction } from "~/Actions/ContextAction"
import { Modal } from "./Modal"
import { zIndexLevel } from "~/zIndexLevel"
import { eventBus } from "@packages/utilities/lib/EventBus"

export interface IModalWrapperProps {
  title?: ReactNode
  content: JSX.Element
  contentStyle?: CSSProperties
  closeEventName?: string | symbol
  actions?: ReactNode[]
  onClose?: () => void
}

export const ModalWrapper = ({
  title,
  content,
  contentStyle,
  closeEventName,
  actions,
  onClose,
}: IModalWrapperProps) => {
  // Listen for modal close event
  useEffect(() => {
    if (!closeEventName || !onClose) return
    eventBus.subscribe(closeEventName, onClose)
    return () => {
      if (closeEventName) eventBus.unsubscribe(closeEventName)
    }
  }, [closeEventName, onClose])

  return (
    <Modal closeModal={onClose} width="1000px" zIndex={zIndexLevel.defaultModal} style={contentStyle}>
      <Card
        title={
          <Row>
            <Col md={{ span: 22, order: 0 }} xs={{ span: 24, order: 1 }}>
              {typeof title === "string" ?
                <h2>{title}</h2>
                : title}
            </Col>
            <Col xs={{ span: 2, offset: 22, }} md={{ offset: 0 }} className={"text-right"}>
              <ContextAction tooltip="Close" type="close" iconColor="primary" onClick={onClose} />
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
      >{content}</Card>
    </Modal>
  )
}