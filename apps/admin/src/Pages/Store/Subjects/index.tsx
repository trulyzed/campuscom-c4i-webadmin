import { useState } from "react"
import { Redirect } from "react-router"
import { notification } from "antd"
import { SubjectFormMeta } from "~/Component/Feature/Subjects/FormMeta/SubjectFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { SubjectQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Subjects"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { SubjectSearchMeta } from "~/TableSearchMeta/Subject/SubjectSearchMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => SubjectQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/store/subject/${resp.data.id}`)
    }
    return resp
  })), [SubjectQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Subjects"}
        meta={SubjectSearchMeta}
        tableProps={{
          ...getSubjectListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Subject`}
              formMeta={SubjectFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Create Subject`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
