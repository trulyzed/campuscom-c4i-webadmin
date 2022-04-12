// import { useState } from "react"
// import { Redirect } from "react-router-dom"
// import { message } from "antd"
// import { CREATE_SUCCESSFULLY } from "~/Constants"
// import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
// import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { getQuestionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { QuestionSearchMeta } from "~/TableSearchMeta/Question/QuestionSearchMeta"
// import { QuestionQueries } from "~/packages/services/Api/Queries/AdminQueries/Questions"
// import { QuestionFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionFormMeta"

export const List = () => {
  // const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  // const createEntity = QueryConstructor(((data) => QuestionQueries.create({ ...data }).then(resp => {
  //   if (resp.success) {
  //     message.success(CREATE_SUCCESSFULLY)
  //     setRedirectAfterCreate(`/administration/question/${resp.data.id}`)
  //   }
  //   return resp
  // })), [QuestionQueries.create])

  return (
    <>
      {/* {redirectAfterCreate && <Redirect to={redirectAfterCreate} />} */}
      <SearchPage
        title={"Questions"}
        meta={QuestionSearchMeta}
        tableProps={{
          ...getQuestionListTableColumns(),
          actions: [
            // <MetaDrivenFormModalOpenButton
            //   formTitle={`Add Question`}
            //   formMeta={QuestionFormMeta}
            //   formSubmitApi={createEntity}
            //   buttonLabel={`Add Question`}
            //   iconType="create"
            // />
          ]
        }}
      />
    </>
  )
}
