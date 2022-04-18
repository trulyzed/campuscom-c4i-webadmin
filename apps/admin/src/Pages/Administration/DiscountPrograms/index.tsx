import { useState } from "react"
import { Redirect } from "react-router-dom"
import { message } from "antd"
import { DiscountProgramFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/DiscountProgramFormMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { DiscountProgramQueries } from "~/packages/services/Api/Queries/AdminQueries/DiscountPrograms"
import { getDiscountProgramListTableColumns } from "~/TableSearchMeta/DiscountProgram/DiscountProgramListTableColumns"
import { DiscountProgramSearchMeta } from "~/TableSearchMeta/DiscountProgram/DiscountProgramSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => DiscountProgramQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
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
              formTitle={`Add Discount Program`}
              formMeta={DiscountProgramFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Discount Program`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
