import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getUserProfileMeta } from "~/TableSearchMeta/UserProfile/UserProfileDetailsMeta"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { PermissionWrapper } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export function UserProfile(props: RouteComponentProps<{ userProfileID?: string }>) {
  const UserProfileID = props?.match?.params?.userProfileID

  const getDetailsPageContent = PermissionWrapper(() => {
    const userInfo = getUser()
    return Promise.resolve({
      code: 200,
      data: userInfo,
      error: !userInfo,
      success: !!userInfo
    })
  }, [{ is_public: true }])

  return <DetailsPage breadcrumbDataIndex="fullname" getMeta={getUserProfileMeta} getDetailsPageContent={getDetailsPageContent} entityType="userProfile" entityID={UserProfileID} titleKey="transaction_request_id" />
}