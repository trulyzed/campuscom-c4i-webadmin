import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react"
import ReactDOM from "react-dom"
import { Row, Col, Spin, Card, Grid } from "antd"
import { zIndexLevel } from "~/zIndexLevel"
import FocusTrap from "focus-trap-react"
import { Options as FocusTrapOptions } from "focus-trap"
import { generateUUID } from "@packages/utilities/lib/UUID"

export const MODAL_HEADING_ID = "modal-heading-id"
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
  style?: CSSProperties
}
export function Modal({
  children,
  width = "200px",
  zIndex = zIndexLevel.defaultModal,
  loading = false,
  loadingTip = "Loading...",
  apiCallInProgress = false,
  style,
  ...args
}: IModalProp) {
  const breakpoint = Grid.useBreakpoint()
  const modalID = generateUUID("modalContainer")
  const focusTrapOption = {
    allowOutsideClick: () => true,
    fallbackFocus: () => document.getElementById(modalID),
    initialFocus: false
  } as FocusTrapOptions
  const modalRef = useRef(null)

  //memoized props
  const closeModal = useMemo(() => args.closeModal, [args.closeModal])

  useEffect(() => {
    const mainBody = document.getElementById("main-body")
    if (mainBody) mainBody.ariaHidden = "true"
    return () => {
      if (mainBody) mainBody.ariaHidden = "false"
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.height = "100vh"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.height = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  const handleEscape = useCallback((e: any) => {
    if (!modalRef.current) return
    if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      if (!e.target?.classList?.contains('ant-upload') && !(modalRef.current as HTMLElement).nextSibling) {
        closeModal && closeModal()
      }
    }
  }, [closeModal])

  useEffect(() => {
    if (!modalRef.current) return
    document.addEventListener("keyup", handleEscape)

    return () => {
      document.removeEventListener("keyup", handleEscape)
    }
  }, [handleEscape])

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
                <Col flex={width} style={{ ...breakpoint.md && { top: "3rem" }, ...style }}>
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
