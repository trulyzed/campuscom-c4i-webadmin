import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getOrganizationTypeFormMeta } from "~/Component/Feature/OrganizationTypes/FormMeta/OrganizationTypeFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"
import { getOrganizationTypeListTableColumns } from "~/TableSearchMeta/OrganizationType/OrganizationTypeListTableColumns"
import { OrganizationTypeSearchMeta } from "~/TableSearchMeta/OrganizationType/OrganizationTypeSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => OrganizationTypeQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/organization-type/${resp.data.id}`)
    }
    return resp
  })), [OrganizationTypeQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Organization Types"}
        meta={OrganizationTypeSearchMeta}
        tableProps={{
          ...getOrganizationTypeListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Organization Type`}
              formMeta={getOrganizationTypeFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Organization Type`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
