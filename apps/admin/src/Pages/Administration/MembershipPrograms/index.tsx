import { useState } from "react"
import { Redirect } from "react-router-dom"
import { message } from "antd"
import { MembershipProgramFormMeta } from "~/Component/Feature/MembershipPrograms/FormMeta/MembershipProgramFormMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { MembershipProgramQueries } from "~/packages/services/Api/Queries/AdminQueries/MembershipPrograms"
import { getMembershipProgramListTableColumns } from "~/TableSearchMeta/MembershipProgram/MembershipProgramListTableColumns"
import { MembershipProgramSearchMeta } from "~/TableSearchMeta/MembershipProgram/MembershipProgramSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => MembershipProgramQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/administration/membership-program/${resp.data.id}`)
    }
    return resp
  })), [MembershipProgramQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Membership Programs"}
        meta={MembershipProgramSearchMeta}
        tableProps={{
          ...getMembershipProgramListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Membership Program`}
              formMeta={MembershipProgramFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Create`}
              iconType={'create'}
            />
          ]
        }}
      />
    </>
  )
}
