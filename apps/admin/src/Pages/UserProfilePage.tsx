import React, { useEffect, useState } from "react"
import { Descriptions, Result } from "antd"
import { IUser } from "~/packages/services/Api/utils/Interfaces"
import { getUser } from "~/packages/services/Api/utils/TokenStore"

export function UserProfilePage() {
  const [userInfo, setUserInfo] = useState<IUser>()
  const [show500, setShow500] = useState(false)
  useEffect(() => {
    const _user = getUser()
    if (_user) setUserInfo(_user as IUser)
    else setShow500(true)
  }, [])
  return (
    <div className="site-layout-content">
      {userInfo && (
        <Descriptions title="User Info" bordered colon size="default">
          <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
        </Descriptions>
      )}
      {show500 && <Result status={500} title="500" subTitle="Sorry, something went wrong." />}
    </div>
  )
}
