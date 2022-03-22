import { useState } from "react"
import { Redirect } from "react-router"
import { message } from "antd"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseSearchMeta } from "~/TableSearchMeta/Course/CourseSearchMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { CourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CourseQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/institute/course/${resp.data.id}`)
    }
    return resp
  })), [CourseQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Courses"}
        meta={CourseSearchMeta}

        tableProps={{
          ...getCourseListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Course`}
              formMeta={CourseFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Course`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
