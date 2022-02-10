import React, { useEffect, useState } from "react"
import { Descriptions, Result } from "antd"
import { IFaculty } from "@packages/api/lib/utils/Interfaces"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { printArrayStringWithComma } from "@packages/utilities/lib/util"

export function UserProfilePage() {
  const [userInfo, setUserInfo] = useState<IFaculty>()
  const [show500, setShow500] = useState(false)
  useEffect(() => {
    const _user = getUser()
    if (_user) setUserInfo(_user as IFaculty)
    else setShow500(true)
  }, [])
  return (
    <div className="site-layout-content">
      {userInfo && (
        <Descriptions title="User Info" bordered colon size="default">
          <Descriptions.Item label="Faculty ID">{userInfo.FacultyID}</Descriptions.Item>
          <Descriptions.Item label="Name">{userInfo.SortName}</Descriptions.Item>
          <Descriptions.Item label="Email">{userInfo.Email}</Descriptions.Item>
          <Descriptions.Item label="Roles">{printArrayStringWithComma({ collection: userInfo.Roles })}</Descriptions.Item>
        </Descriptions>
      )}
      {show500 && <Result status={500} title="500" subTitle="Sorry, something went wrong." />}
    </div>
  )
}
