import React, { useState } from "react"
import { Redirect } from "react-router"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

export const GoToUserProfileButton = () => {
  const [redirectTo, setRedirectTo] = useState<string | undefined>()
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <IconButton
        iconType="profile"
        toolTip="User Profile"
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
