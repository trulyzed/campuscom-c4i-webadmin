import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getDiscountProgramFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/DiscountProgramFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"
import { getDiscountProgramListTableColumns } from "~/TableSearchMeta/DiscountProgram/DiscountProgramListTableColumns"
import { DiscountProgramSearchMeta } from "~/TableSearchMeta/DiscountProgram/DiscountProgramSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => DiscountProgramQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/discount-program/${resp.data.id}`)
    }
    return resp
  })), [DiscountProgramQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Discount Programs"}
        meta={DiscountProgramSearchMeta}
        tableProps={{
          ...getDiscountProgramListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Discount Program`}
              formMeta={getDiscountProgramFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Discount Program`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
