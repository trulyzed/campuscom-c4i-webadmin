import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { getScheduleListTableColumns } from "~/TableSearchMeta/Schedule/ScheduleListTableColumns"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getSectionFormMeta } from "~/Component/Feature/Sections/FormMeta/SectionFormMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { SectionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Sections"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { ScheduleQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Schedules"
import { getScheduleFormMeta } from "~/Component/Feature/Schedules/FormMeta/ScheduleFormMeta"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => SectionQueries.update({ ...data, params: { id: section.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [SectionQueries.update])

  const createSchedule = QueryConstructor(((data) => ScheduleQueries.create({ ...data, data: { ...data?.data, section: section.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [ScheduleQueries.create])

  const summaryInfo: CardContainer = {
    title: `Section: ${section.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Section`}
        formMeta={getSectionFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...section, course: section.course.id, course_fee: section.amount, instructors: section.instructors.map((i: any) => i.id), }}
        defaultFormValue={{ sectionId: section.id }}
        buttonLabel={`Update Section`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Course', value: renderLink(`/course-provider/course/${section.course.id}`, section.course.title), },
      { label: 'Section Name', value: section.name, },
      { label: 'Fee', value: section.fee, },
      { label: 'Number of Seat', value: section.seat_capacity, },
      { label: 'Available Seat', value: section.available_seat, },
      { label: 'Registration URL', value: section.registration_url, },
      { label: 'Description', value: section.description, },
      { label: 'Execution Mode', value: section.execution_mode, },
      { label: 'Execution Site', value: section.execution_site, },
      { label: 'Credit Hours', value: section.credit_hours, },
      { label: 'CEUs', value: section.ceu_hours, },
      { label: 'Clock Hours', value: section.clock_hours, },
      { label: 'Load Hours', value: section.load_hours, },
      { label: 'Start Date', value: section.start_date, render: renderDateTime },
      { label: 'End Date', value: section.end_date, render: renderDateTime },
      { label: 'Registration Deadline', value: section.registration_deadline, render: renderDateTime },
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
      helpKey: "sectionSummaryTab"
    },
    {
      tabTitle: "Schedules",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getScheduleListTableColumns(),
          searchParams: { section__id: section.id },
          refreshEventName: "REFRESH_SCHEDULE_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Schedule`}
              formMeta={getScheduleFormMeta()}
              formSubmitApi={createSchedule}
              buttonLabel={`Create Schedule`}
              iconType="create"
              refreshEventName={'REFRESH_SCHEDULE_TAB'}
            />
          ]
        }
      },
      helpKey: "schedulesTab"
    },
    {
      tabTitle: "Instructors",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getInstructorListTableColumns(),
          searchParams: { section__id: section.id },
          refreshEventName: "REFRESH_INSTRUCTOR_TAB",
        }
      },
      helpKey: "instructorsTab"
    },
    {
      tabTitle: "Enrollments",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getEnrollmentListTableColumns(),
          searchParams: { section__id: section.id },
          refreshEventName: "REFRESH_ENROLLMENT_TAB",
        }
      },
      helpKey: "enrollmentsTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: section.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Section Title - ${section.name}`,
    tabs: tabMetas
  }
}
