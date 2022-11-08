import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getCompanyUserFormMeta } from "~/Component/Feature/CompanyUsers/FormMeta/CompanyUserFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CompanyUserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CompanyUsers"
import { getCompanyUserListTableColumns } from "~/TableSearchMeta/CompanyUser/CompanyUserListTableColumns"
import { CompanyUserSearchMeta } from "~/TableSearchMeta/CompanyUser/CompanyUserSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CompanyUserQueries.create({ ...data, data: { ...data?.data, companies: [data?.data.companies] } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/affiliate-user/${resp.data.id}`)
    }
    return resp
  })), [CompanyUserQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Affiliate Users"}
        meta={CompanyUserSearchMeta}
        tableProps={{
          ...getCompanyUserListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Affiliate User`}
              formMeta={getCompanyUserFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Affiliate User`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
