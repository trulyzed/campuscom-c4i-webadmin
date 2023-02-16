import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderAnswer, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"

export const getEnrollmentDetailsMeta = (enrollment: { [key: string]: any }): IDetailsMeta => {
  const registrationQuestions = enrollment.registration_details?.find((i: any) => (i.product_id === enrollment.product_id) && (i.student === enrollment.profile.primary_email))?.data
  const summaryInfo: CardContainer = {
    title: `Enrollment: ${enrollment.course.title}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${enrollment.store.id}`, enrollment.store.name) },
      { label: 'Course', value: renderLink(`/course-provider/course/${enrollment.course.id}`, enrollment.course.title) },
      { label: 'Section', value: renderLink(`/course-provider/section/${enrollment.section.id}`, enrollment.section.name) },
      { label: 'Profile', value: renderLink(`/storefront-data/student/${enrollment.profile.id}`, `${enrollment.profile.first_name} ${enrollment.profile.last_name}`), },
      { label: 'Enrollment Time', value: enrollment.enrollment_time, render: renderDateTime },
      { label: 'Application Time', value: enrollment.application_time, render: renderDateTime },
      { label: 'Enrollment Status', value: enrollment.status },
    ]
  }

  const registrationInformation: CardContainer = {
    title: "Registration Information",
    contents: processQuestions((registrationQuestions || []) as any[]).map(i => ({
      label: i.question,
      value: renderAnswer(i.answer, i)
    })),
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo, registrationInformation]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "enrollmentSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: enrollment.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Enrollment Title - ${enrollment.course.title}`,
    tabs: tabMetas
  }
}
