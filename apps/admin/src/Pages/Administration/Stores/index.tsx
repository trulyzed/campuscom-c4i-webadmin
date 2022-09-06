import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getStoreFormMeta } from "~/Component/Feature/Stores/FormMeta/StoreFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { getStoreListTableColumns } from "~/TableSearchMeta/Store/StoreListTableColumns"
import { StoreSearchMeta } from "~/TableSearchMeta/Store/StoreSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => StoreQueries.create({ ...data, data: { ...data?.data, default_payment_gateway: true }, }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/store/${resp.data.id}`)
    }
    return resp
  })), [StoreQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Stores"}
        meta={StoreSearchMeta}
        tableProps={{
          ...getStoreListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Store`}
              formMeta={getStoreFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Add Store`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
