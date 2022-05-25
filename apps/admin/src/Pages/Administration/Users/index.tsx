import { useState } from "react"
import { Redirect } from "react-router-dom"
import { message } from "antd"
import { UserFormMeta } from "~/Component/Feature/Users/FormMeta/UserFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { UserQueries } from "~/packages/services/Api/Queries/AdminQueries/Users"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserSearchMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => UserQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
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
              formTitle={`Add User`}
              formMeta={UserFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add User`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
