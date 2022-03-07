import React, { useEffect, useState } from "react"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

export const GoToSearchResultPageButton = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)
  useEffect(() => {
    const urlAsIDs = Object.keys(sessionStorage).filter((key) => key.startsWith("http") && key.includes("webadmin"))
    if (urlAsIDs.length) {
      for (const id of urlAsIDs) {
        const currentUrl = sessionStorage[id]
        if (window.location.href.includes(currentUrl)) {
          const urlAsID = id
          setUrl(urlAsID.slice(urlAsID.indexOf("webadmin") + 8))
          break
        }
      }
    }
  }, [])
  return <>{url && <IconButton buttonType="default" iconType="leftCircle" toolTip="Go to Search Results" redirectTo={url} />}</>
}
