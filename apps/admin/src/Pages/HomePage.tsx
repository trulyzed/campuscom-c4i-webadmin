import React, { useEffect, useState } from "react"
import { eventBus, REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { IFaculty } from "@packages/api/lib/utils/Interfaces"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { Intro } from "~/Component/Feature/Intro"

export function HomePage() {
  const [userInfo, setUserInfo] = useState<IFaculty>()
  const loadUserInfo = () => {
    const _user = getUser()
    if (_user) setUserInfo(_user as IFaculty)
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadUserInfo)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
  }, [])
  return <>{userInfo && <Intro userInfo={userInfo} />}</>
}
