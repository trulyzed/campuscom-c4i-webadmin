import React, { useEffect } from "react"
import { Login } from "~/Component/Login/Login"
import { Modal } from "@packages/components/lib/Modal/Modal"
import { zIndexLevel } from "@packages/components/lib/zIndexLevel"

interface ILoginModalProps {
  removeGLobalApiError?: () => void
}

export const LoginModal = (props: ILoginModalProps) => {
  useEffect(() => {
    if (props.removeGLobalApiError) {
      props.removeGLobalApiError()
    }
  }, [props])

  return <Modal children={<Login modal />} width="300px" zIndex={zIndexLevel.loginModal}></Modal>
}
