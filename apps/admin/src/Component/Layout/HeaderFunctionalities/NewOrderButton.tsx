import React, { useState } from "react"
import { Redirect } from "react-router"
// import { NewOrderPermission } from "~/ApiServices/ApiPermission/NewOrderPermission"
import { IconButton } from "@packages/components/lib/Form/Buttons/IconButton"

const NewOrderPermission = true
export const NewOrderButton = () => {
  const [redirectTo, setRedirectTo] = useState<string | undefined>()
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <IconButton
        iconType="cart"
        toolTip={NewOrderPermission ? "New Order" : "New Order Permission Denied"}
        onClick={() => {
          setRedirectTo("/create-order")
          setTimeout(() => {
            setRedirectTo(undefined)
          }, 0)
        }}
        buttonType={"default"}
        disabled={!NewOrderPermission}
      />
    </>
  )
}
