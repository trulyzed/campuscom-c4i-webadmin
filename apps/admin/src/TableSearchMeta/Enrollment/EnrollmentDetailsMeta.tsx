import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderAnswer, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { CreateOrder } from "~/Component/Feature/Orders/Create/CreateOrder"
import { processContacts } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Contacts"
import { CLOSE_MODAL } from "~/Constants"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"

export const getEnrollmentDetailsMeta = (enrollment: { [key: string]: any }): IDetailsMeta => {
  const registrationQuestions = enrollment.registration_details?.find((i: any) => (i.product_id === enrollment.product_id) && (i.student === enrollment.profile.primary_email))?.data
  const summaryInfo: CardContainer = {
    title: `Enrollment: ${enrollment.course.title}`,
    cardActions: ((enrollment.status === "pending") || (enrollment.status === "success")) ? [
      <ContextAction
        type="swap"
        tooltip="Swap"
        modalProps={{
          title: "Swap Student",
          content: <CreateOrder
            initialValue={{
              enrollmentId: enrollment.id,
              reservationId: enrollment.seat_reservation,
              store: enrollment.store,
              purchaser: enrollment.purchaser_info,
              product: enrollment.product,
              profile: processContacts([enrollment.profile]).pop() as Record<string, any>,
            }}
            refreshEventName={[`${CLOSE_MODAL}_ENROLLMENT`, REFRESH_PAGE]}
            isSwap
          />,
          closeHandlerEventName: `${CLOSE_MODAL}_ENROLLMENT`
        }}
      />,
      <ContextAction
        confirmationType="Drop/withdraw"
        type="drop"
        tooltip="Drop/Withdraw"
        queryService={QueryConstructor(() => EnrollmentQueries.remove({ data: { course_enrollment: enrollment.id } }), [SeatBlockQueries.removeRegistration])}
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
