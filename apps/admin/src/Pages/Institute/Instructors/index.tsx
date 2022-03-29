import { useState } from "react"
import { Redirect } from "react-router-dom"
import { message } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { InstructorFormMeta } from "~/Component/Feature/Instructors/FormMeta/InstructorFormMeta"
import { InstructorQueries } from "~/packages/services/Api/Queries/AdminQueries/Instructors"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => InstructorQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/institute/course/${resp.data.id}`)
    }
    return resp
  })), [InstructorQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Instructors"}
        meta={InstructorSearchMeta}
        tableProps={{
          ...getInstructorListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Instructor`}
              formMeta={InstructorFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Instructor`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
