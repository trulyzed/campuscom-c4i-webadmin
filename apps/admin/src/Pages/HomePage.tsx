import React, { useEffect, useState } from "react"
import { eventBus, REFRESH_PAGE } from "~/packages/utils/EventBus"
import { getUser } from "~/packages/services/Api/utils/TokenStore"
import { Intro } from "~/Component/Feature/Intro"
import { IUser } from "~/packages/services/Api/utils/Interfaces"

export function HomePage() {
  const [userInfo, setUserInfo] = useState<IUser>()
  const loadUserInfo = () => {
    const _user = getUser()
    if (_user) setUserInfo(_user as IUser)
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
