import React, { useEffect, useState } from "react"
import { IconButton } from "~/Form/Buttons/IconButton"

export const GoToSearchResultPageButton = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)
  useEffect(() => {
    const urlAsIDs = Object.keys(sessionStorage).filter((key) => key.startsWith("http") && key.includes(window.location.host))
    if (urlAsIDs.length) {
      for (const id of urlAsIDs) {
        const currentUrl = sessionStorage[id]
        if (window.location.href.includes(currentUrl)) {
          setUrl((new URL(id)).pathname)
          break
        }
      }
    }
  }, [])
  return <>{url && <IconButton buttonType="default" iconType="back" toolTip="Go to Search Results" redirectTo={url} />}</>
}
