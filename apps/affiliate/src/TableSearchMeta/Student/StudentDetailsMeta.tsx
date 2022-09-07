import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDate } from "@packages/components/lib/ResponsiveTable"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getStudentDetailsMeta = (student: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Student: ${student.first_name} ${student.last_name}`,
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
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: student.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Student Title - ${student.first_name} ${student.last_name}`,
    tabs: tabMetas
  }
}
