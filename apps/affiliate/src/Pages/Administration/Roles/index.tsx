import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { RoleFormMeta } from "~/Component/Feature/Roles/FormMeta/RoleFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Roles"
import { getRoleListTableColumns } from "~/TableSearchMeta/Role/RoleListTableColumns"
import { RoleSearchMeta } from "~/TableSearchMeta/Role/RoleSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => RoleQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/role/${resp.data.id}`)
    }
    return resp
  })), [RoleQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Roles"}
        meta={RoleSearchMeta}
        tableProps={{
          ...getRoleListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Role`}
              formMeta={RoleFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Role`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
