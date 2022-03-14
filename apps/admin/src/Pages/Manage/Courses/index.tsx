import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseSearchMeta } from "~/TableSearchMeta/Course/CourseSearchMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { CourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Courses"}
      meta={CourseSearchMeta}

      tableProps={{
        ...getCourseListTableColumns(),
        actions: [
          <MetaDrivenFormModalOpenButton
            formTitle={`Add Course`}
            formMeta={CourseFormMeta}
            formSubmitApi={CourseQueries.create}
            initialFormValue={{
              IsActive: true
            }}
            buttonLabel={`Add Course`}
            iconType="create"
          />
        ]
      }}
    />
  )
}
