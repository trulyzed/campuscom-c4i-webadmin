import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { ProductFormMeta } from "~/Component/Feature/Products/FormMeta/ProductFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => ProductQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/store/product/${resp.data.id}`)
    }
    return resp
  })), [ProductQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Products"}
        meta={ProductSearchMeta}
        tableProps={{
          ...getProductListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Product`}
              formMeta={ProductFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Product`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
