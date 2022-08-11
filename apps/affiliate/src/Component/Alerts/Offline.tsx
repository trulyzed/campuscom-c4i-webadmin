import React, { useEffect, useState } from "react"
import { Card } from "antd"
import { zIndexLevel } from "~/packages/components/zIndexLevel"
import { Modal } from "~/packages/components/Modal/Modal"

export function OfflineAlert() {
  const [IsOffline, setIsOffline] = useState(!navigator.onLine)
  useEffect(() => {
    window.addEventListener("online", setIsOffline.bind(null, false))
    window.addEventListener("offline", setIsOffline.bind(null, true))
    return () => {
      window.removeEventListener("online", setIsOffline.bind(null, false))
      window.removeEventListener("offline", setIsOffline.bind(null, true))
    }
  }, [])
  return (
    <React.Fragment>
      {IsOffline && (
        <Modal
          zIndex={zIndexLevel.offlineModal}
          children={
            <Card bordered={true}>
              <Card.Meta title="No Internet Connection" description="You are offline. Please check your internet connection" />
            </Card>
          }
        />
      )}
    </React.Fragment>
  )
}
