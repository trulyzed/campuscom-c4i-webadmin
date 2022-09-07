import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { UserFormMeta } from "~/Component/Feature/Users/FormMeta/UserFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Users"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserSearchMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => UserQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/user/${resp.data.id}`)
    }
    return resp
  })), [UserQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Users"}
        meta={UserSearchMeta}
        tableProps={{
          ...getUserListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create User`}
              formMeta={UserFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Create User`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
