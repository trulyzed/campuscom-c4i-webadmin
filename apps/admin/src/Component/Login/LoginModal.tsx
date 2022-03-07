import React, { useEffect } from "react"
import { Login } from "~/Component/Login/Login"
import { Modal } from "~/packages/components/Modal/Modal"
import { zIndexLevel } from "~/packages/components/zIndexLevel"

interface ILoginModalProps {
  removeGLobalApiError?: () => void
}

export const LoginModal = (props: ILoginModalProps) => {
  useEffect(() => {
    if (props.removeGLobalApiError) {
      props.removeGLobalApiError()
    }
  }, [props])

  return <Modal children={<Login modal={true} />} width="300px" zIndex={zIndexLevel.loginModal}></Modal>
}
