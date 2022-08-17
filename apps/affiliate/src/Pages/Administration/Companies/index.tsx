import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CompanyFormMeta } from "~/Component/Feature/Companies/FormMeta/CompanyFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { getCompanyListTableColumns } from "~/TableSearchMeta/Company/CompanyListTableColumns"
import { CompanySearchMeta } from "~/TableSearchMeta/Company/CompanySearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CompanyQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/company/${resp.data.id}`)
    }
    return resp
  })), [CompanyQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Companies"}
        meta={CompanySearchMeta}
        tableProps={{
          ...getCompanyListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Company`}
              formMeta={CompanyFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Company`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
