import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getCourseProviderListTableColumns } from "~/TableSearchMeta/CourseProvider/CourseProviderListTableColumns"
import { CourseProviderSearchMeta } from "~/TableSearchMeta/CourseProvider/CourseProviderSearchMeta"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { getCourseProviderFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/CourseProviderFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CourseProviderQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
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
              formTitle={`Create Course Provider`}
              formMeta={getCourseProviderFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Course Provider`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
