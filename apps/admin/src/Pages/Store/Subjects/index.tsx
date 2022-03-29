import { useState } from "react"
import { Redirect } from "react-router"
import { message } from "antd"
import { SubjectFormMeta } from "~/Component/Feature/Subjects/FormMeta/SubjectFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { SubjectSearchMeta } from "~/TableSearchMeta/Subject/SubjectSearchMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => SubjectQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
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
              formTitle={`Add Subject`}
              formMeta={SubjectFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Subject`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
