import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"

const routeSkipHeading = css`
  position: relative;
`

const routeSkipLink = css`
  display: inline-block;
  margin-left: -0.75em;
  opacity: 0;
  position: absolute;
  text-decoration: none;

  &:before {
    content: "⇽";
    display: block;
  }
  &:focus,
  &:hover {
    opacity: 1;
  }
`

export const SidebarMenuTargetHeading = ({ level = 1, targetID = "navigation", children }) => {
  const Heading = `h${level}`
  const headingRef = React.createRef()
  const [tempTargetID, setTempTargetID] = useState("")

  useEffect(() => {
    if (window && window.location.hash.includes(`#main`) && headingRef.current) {
      headingRef.current.focus()
      setTempTargetID(window.location.hash.split('#main').join(''))
    }
  }, [])

  return (
    <Heading
      css={routeSkipHeading} className="routeSkipHeading"
    >
      <a ref={headingRef} href={`#${tempTargetID}`} id="main" className="routeSkipLink reset" css={routeSkipLink}
        aria-label={`back to ${tempTargetID.split('-').join(' ')}, or keep tabbing to main content`} title={`Skip to ${targetID}`}
        onClick={() => {
          const sidebarLink = document.getElementById(tempTargetID)
          if (sidebarLink) {
            sidebarLink.focus()
          }
        }}></a>
      {children}
    </Heading>
  )
}
