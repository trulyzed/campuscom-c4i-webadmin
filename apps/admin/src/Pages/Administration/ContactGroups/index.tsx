import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getContactGroupFormMeta } from "~/Component/Feature/ContactGroups/FormMeta/ContactGroupFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContactGroupQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ContactGroups"
import { getContactGroupListTableColumns } from "~/TableSearchMeta/ContactGroup/ContactGroupListTableColumns"
import { ContactGroupSearchMeta } from "~/TableSearchMeta/ContactGroup/ContactGroupSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => ContactGroupQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/contact-group/${resp.data.id}`)
    }
    return resp
  })), [ContactGroupQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Contact Groups"}
        meta={ContactGroupSearchMeta}
        tableProps={{
          ...getContactGroupListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Contact Group`}
              formMeta={getContactGroupFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Contact Group`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
