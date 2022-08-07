import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { CampusQueries } from "~/packages/services/Api/Queries/AdminQueries/Campuses"
import { getCampusListTableColumns } from "~/TableSearchMeta/Campus/CampusListTableColumns"
import { CampusSearchMeta } from "~/TableSearchMeta/Campus/CampusSearchMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CampusFormMeta } from "~/Component/Feature/Campuses/FormMeta/CampusFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CampusQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/institute/campus/${resp.data.id}`)
    }
    return resp
  })), [CampusQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Campuses"}
        meta={CampusSearchMeta}
        tableProps={{
          ...getCampusListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Campus`}
              formMeta={CampusFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Campus`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
