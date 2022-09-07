import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { IdentityProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/IdentityProviders"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns"
import { IdentityProviderSearchMeta } from "~/TableSearchMeta/IdentityProvider/IdentityProviderSearchMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { IdentityProviderFormMeta } from "~/Component/Feature/IdentityProviders/FormMeta/IdentityProviderFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => IdentityProviderQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/configuration/identity-provider/${resp.data.id}`)
    }
    return resp
  })), [IdentityProviderQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Identity Providers"}
        meta={IdentityProviderSearchMeta}
        tableProps={{
          ...getIdentityProviderListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Identity Provider`}
              formMeta={IdentityProviderFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Create Identity Provider`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
