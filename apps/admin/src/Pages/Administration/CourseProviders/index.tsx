import { useState } from "react"
import { Redirect } from "react-router-dom"
import { message } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { getCourseProviderListTableColumns } from "~/TableSearchMeta/CourseProvider/CourseProviderListTableColumns"
import { CourseProviderSearchMeta } from "~/TableSearchMeta/CourseProvider/CourseProviderSearchMeta"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
import { CourseProviderFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/CourseProviderFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CourseProviderQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/administration/course-provider/${resp.data.id}`)
    }
    return resp
  })), [CourseProviderQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Course Providers"}
        meta={CourseProviderSearchMeta}
        tableProps={{
          ...getCourseProviderListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Course Provider`}
              formMeta={CourseProviderFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Course Provider`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
