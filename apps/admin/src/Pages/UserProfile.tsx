import React, { useEffect, useState } from "react"
import { Result } from "antd"
import { IUser } from "~/packages/services/Api/utils/Interfaces"
import { getUser } from "~/packages/services/Api/utils/TokenStore"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getProfileMeta } from "~/TableSearchMeta/Profile/ProfileDetailsMeta"
import { ConstructQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export function UserProfile() {
  const [userInfo, setUserInfo] = useState<IUser>()
  const [show500, setShow500] = useState(false)
  useEffect(() => {
    const _user = getUser()
    if (_user) setUserInfo(_user as IUser)
    else setShow500(true)
  }, [])
  return (
    // <DetailsPage
    // />
    <div className="site-layout-content">
      {userInfo && (
        <DetailsPage
          getDetailsPageContent={ConstructQuery(() => Promise.resolve({
            code: 200,
            data: userInfo,
            error: false,
            success: true
          }), { is_public: true })}
          getMeta={() => getProfileMeta(userInfo)}
        />
      )}
      {show500 && <Result status={500} title="500" subTitle="Sorry, something went wrong." />}
    </div>
  )
}
