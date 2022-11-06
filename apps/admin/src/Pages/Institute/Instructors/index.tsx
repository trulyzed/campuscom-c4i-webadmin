import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getInstructorFormMeta } from "~/Component/Feature/Instructors/FormMeta/InstructorFormMeta"
import { InstructorQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Instructors"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => InstructorQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/course-provider/instructor/${resp.data.id}`)
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
              formTitle={`Create Instructor`}
              formMeta={getInstructorFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Instructor`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
