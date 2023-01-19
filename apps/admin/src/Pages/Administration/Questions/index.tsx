import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getQuestionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { QuestionSearchMeta } from "~/TableSearchMeta/Question/QuestionSearchMeta"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { getQuestionFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => QuestionQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/question/${resp.data.id}`)
    }
    return resp
  })), [QuestionQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Questions"}
        meta={QuestionSearchMeta}
        tableProps={{
          ...getQuestionListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Question`}
              formMeta={getQuestionFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Question`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
