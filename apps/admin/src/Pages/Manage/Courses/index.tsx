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
import { ConstructQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = ConstructQuery(((data) => CourseQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/courses/${resp.data.id}`)
    }
    return resp
  })) as IQuery, CourseQueries.create.__permission)

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
              initialFormValue={{
                IsActive: true
              }}
              buttonLabel={`Add Course`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
