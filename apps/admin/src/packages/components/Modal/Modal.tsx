import React, { CSSProperties, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { Row, Col, Spin, Card } from "antd"
import { zIndexLevel } from "~/packages/components/zIndexLevel"
import FocusTrap from "focus-trap-react"
import { Options as FocusTrapOptions } from "focus-trap"
import { generateUUID } from "~/packages/utils/UUID"

const modalStyle: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "#fff",
  height: "100%",
  left: "0",
  overflow: "auto",
  position: "fixed",
  top: "0",
  width: "100%"
}

const modalContentStyle: CSSProperties = {
  left: "0",
  margin: "auto",
  position: "fixed",
  right: "0"
}

const apiInProgressStyle: CSSProperties = {
  backgroundColor: "lightGray",
  bottom: "0",
  height: "97%",
  opacity: "0.3",
  position: "absolute",
  width: "1000px"
}
const spinnerStyle: CSSProperties = {
  left: "50%",
  position: "absolute",
  top: "50%"
}
interface IModalProp {
  children: JSX.Element
  width?: string
  zIndex?: number
  loading?: boolean
  loadingTip?: string
  apiCallInProgress?: boolean
  closeModal?: () => void
}
export function Modal({
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal,
  loading = false,
  loadingTip = "Loading...",
  apiCallInProgress = false,
  closeModal
}: IModalProp) {
  const modalID = generateUUID("modalContainer")
  const focusTrapOption = {
    allowOutsideClick: () => true,
    fallbackFocus: () => document.getElementById(modalID)
  } as FocusTrapOptions
  const modalRef = useRef(null)

  useEffect(() => {
    document.documentElement.style.height = "100vh"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.height = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
        if (modalRef && modalRef.current) {
          const modalContainer = modalRef.current as HTMLElement
          if (!modalContainer.nextSibling) {
            closeModal && closeModal()
          }
        }
      }
    }

    setTimeout(() => {
      if (modalRef && modalRef.current) {
        const modalContainer = modalRef.current as HTMLElement
        modalContainer.addEventListener("keyup", handleEscape)
      }
    }, 0)

    if (modalRef && modalRef.current) {
      const modalContainer = modalRef.current as HTMLElement
      return modalContainer.removeEventListener("keyup", handleEscape)
    }
    // eslint-disable-next-line
  }, [])
  return ReactDOM.createPortal(
    <>
      <FocusTrap
        tabIndex={-1}
        role="dialog"
        aria-labelledby="Modal"
        aria-modal="true"
        focusTrapOptions={focusTrapOption}
        children={
          <div id={modalID} ref={modalRef}>
            <div style={{ zIndex, ...modalStyle }}></div>
            <Row style={{ zIndex: zIndex + 1, ...modalContentStyle }}>
              <Col flex="auto"></Col>
              {loading && <ModalLoading {...{ width, loadingTip }} />}
              {!loading && (
                <Col flex={width}>
                  {children}
                  {apiCallInProgress && (
                    <div style={apiInProgressStyle}>
                      <div style={spinnerStyle}>
                        <Spin size="large" />
                      </div>
                    </div>
                  )}
                </Col>
              )}
              <Col flex="auto"></Col>
            </Row>
          </div>
        }
      ></FocusTrap>
    </>,
    document.getElementById("modal-container") as HTMLElement
  )
}

interface IModalLoading {
  width: string
  loadingTip?: string
}
function ModalLoading(props: IModalLoading) {
  return (
    <Col flex={props.width}>
      <Card>
        <Row justify="center" align="middle">
          <Col flex="none">
            <Spin tip={props.loadingTip} />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}
