import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getOrganizationFormMeta } from "~/Component/Feature/Organizations/FormMeta/OrganizationFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
import { getOrganizationListTableColumns } from "~/TableSearchMeta/Organization/OrganizationListTableColumns"
import { OrganizationSearchMeta } from "~/TableSearchMeta/Organization/OrganizationSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => OrganizationQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/company/${resp.data.id}`)
    }
    return resp
  })), [OrganizationQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Companies"}
        meta={OrganizationSearchMeta}
        tableProps={{
          ...getOrganizationListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Company`}
              formMeta={getOrganizationFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Company`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
