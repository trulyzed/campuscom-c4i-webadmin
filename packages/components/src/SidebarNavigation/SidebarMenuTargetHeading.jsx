import React from "react"

export const SidebarMenuTargetHeading = ({ level = 1, targetID = "navigation", children }) => {
  const Heading = `h${level}`

  return (
    <Heading
      style={{margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}
      id={targetID}
      title={children}
    >
      {children}
    </Heading>
  )
}
