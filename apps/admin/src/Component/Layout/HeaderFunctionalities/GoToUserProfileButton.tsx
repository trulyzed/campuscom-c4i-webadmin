import React, { useState } from "react"
import { Redirect } from "react-router"
import { ContextAction } from "~/packages/components/Actions/ContextAction"

export const GoToUserProfileButton = () => {
  const [redirectTo, setRedirectTo] = useState<string | undefined>()
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <ContextAction
        type="goToProfile"
        tooltip="User Profile"
        onClick={() => {
          setRedirectTo("/user-profile")
          setTimeout(() => {
            setRedirectTo(undefined)
          }, 0)
        }}
      />
    </>
  )
}
