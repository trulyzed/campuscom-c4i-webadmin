import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"
import { getScheduleListTableColumns } from "~/TableSearchMeta/Schedule/ScheduleListTableColumns"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Section: ${section.name}`,
    contents: [
      { label: 'Course', value: renderLink(`/institute/course/${section.course.id}`, section.course.title), },
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
  ]

  return {
    pageTitle: `Section Title - ${section.name}`,
    tabs: tabMetas
  }
}
