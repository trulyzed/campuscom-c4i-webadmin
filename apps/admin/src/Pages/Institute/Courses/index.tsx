import { useState } from "react"
import { Redirect } from "react-router"
import { notification } from "antd"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseSearchMeta } from "~/TableSearchMeta/Course/CourseSearchMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
import { getCourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CourseQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/course-provider/course/${resp.data.id}`)
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
              formMeta={getCourseFormMeta()}
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
