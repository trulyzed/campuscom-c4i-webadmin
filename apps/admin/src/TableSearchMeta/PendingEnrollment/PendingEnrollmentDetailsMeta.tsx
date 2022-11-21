import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"

export const getPendingEnrollmentDetailsMeta = (enrollment: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Pending Approval: ${enrollment.course.title}`,
    cardActions: enrollment.approval_status === "pending" ? [
      <ContextAction
        confirmationType="Approve"
        type="approve"
        tooltip="Approve"
        queryService={QueryConstructor(() => EnrollmentQueries.updateApprovalStatus({
          data: { course_enrollment: enrollment.id, approval_status: "approved" },
        }), [EnrollmentQueries.updateApprovalStatus])}
        redirectTo={`/storefront-data/pending-approval?page=1`}
      />,
      <ContextAction
        confirmationType="Cancel"
        type="drop"
        tooltip="Cancel"
        queryService={QueryConstructor(() => EnrollmentQueries.updateApprovalStatus({
          data: { course_enrollment: enrollment.id, approval_status: "canceled" },
        }), [EnrollmentQueries.updateApprovalStatus])}
        refreshEventName={REFRESH_PAGE}
        iconColor="warning"
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ] : [],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${enrollment.store.id}`, enrollment.store.name) },
      { label: 'Course', value: renderLink(`/course-provider/course/${enrollment.course.id}`, enrollment.course.title) },
      { label: 'Section', value: renderLink(`/course-provider/section/${enrollment.section.id}`, enrollment.section.name) },
      { label: 'Profile', value: renderLink(`/storefront-data/student/${enrollment.profile.id}`, `${enrollment.profile.first_name} ${enrollment.profile.last_name}`), },
      { label: 'Enrollment Time', value: enrollment.enrollment_time, render: renderDateTime },
      { label: 'Application Time', value: enrollment.application_time, render: renderDateTime },
      { label: 'Enrollment Status', value: enrollment.status },
      { label: 'Approval Status', value: enrollment.approval_status },
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
    pageTitle: `Pending Approval Title - ${enrollment.course.title}`,
    tabs: tabMetas
  }
}
