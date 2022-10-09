import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { MembershipProgramFormMeta } from "~/Component/Feature/MembershipPrograms/FormMeta/MembershipProgramFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { MembershipProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/MembershipPrograms"
import { getMembershipProgramListTableColumns } from "~/TableSearchMeta/MembershipProgram/MembershipProgramListTableColumns"
import { MembershipProgramSearchMeta } from "~/TableSearchMeta/MembershipProgram/MembershipProgramSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => MembershipProgramQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
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
              formTitle={`Create Membership Program`}
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
