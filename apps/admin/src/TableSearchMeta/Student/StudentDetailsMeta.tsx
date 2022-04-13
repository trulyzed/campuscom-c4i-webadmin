import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderDate } from "~/packages/components/ResponsiveTable"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { StudentFormMeta } from "~/Component/Feature/Students/FormMeta/StudentFormMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"

export const getStudentDetailsMeta = (student: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StudentQueries.update({ ...data, params: { id: student.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [StudentQueries.update])

  const summaryInfo: CardContainer = {
    title: `Student: ${student.first_name} ${student.last_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Course`}
        formMeta={StudentFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...student }}
        defaultFormValue={{ studentId: student.id }}
        buttonLabel={`Update Course`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'First Name', value: student.first_name, render: (text: any) => text },
      { label: 'Last Name', value: student.last_name },
      { label: 'Date of Birth', value: student.date_of_birth, render: renderDate },
      { label: 'Profile Picture', value: renderThumb(student.profile_picture_uri, "Student's image") },
      { label: 'Primary Email', value: student.primary_email, render: (text: any) => text },
      { label: 'Primary Contact Number', value: student.primary_contact_number, render: (text: any) => text },
      { label: 'Terms Accepted', value: student.terms_accepted, render: (text: any) => text },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "studentSummaryTab"
    },
    {
      tabTitle: "Course Enrollments",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getEnrollmentListTableColumns(),
          searchParams: { profile__id: student.id },
          refreshEventName: "REFRESH_COURSE_ENROLLMENT_TAB",
        }
      },
      helpKey: "courseEnrollmentTab"
    },
  ]

  return {
    pageTitle: `Student Title - ${student.first_name} ${student.last_name}`,
    tabs: tabMetas
  }
}
