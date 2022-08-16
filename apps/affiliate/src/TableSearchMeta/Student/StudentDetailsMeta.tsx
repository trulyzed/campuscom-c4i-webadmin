import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink, renderDate, renderDateTime } from "~/packages/components/ResponsiveTable"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { StudentFormMeta } from "~/Component/Feature/Students/FormMeta/StudentFormMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"
import { MembershipProgramQueries } from "~/packages/services/Api/Queries/AdminQueries/MembershipPrograms"
import { MembershipProgramTaggingFormMeta } from "~/Component/Feature/Students/FormMeta/MembershipProgramTaggingFormMeta"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "~/packages/components/Actions/ContextAction"

export const getStudentDetailsMeta = (student: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StudentQueries.update({ ...data, params: { id: student.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [StudentQueries.update])

  const addMembershipProgram = QueryConstructor(((data) => StudentQueries.tagMembersipProgram({ ...data, data: { ...data?.data, profiles: [student.id] } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [StudentQueries.tagMembersipProgram])

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
    {
      tabTitle: "Membership Programs",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: 'Title',
              dataIndex: 'membership_program',
              render: (text: any) => renderLink(`/administration/membership-program/${text.id}`, text.title),
              sorter: (a: any, b: any) => a.membership_program.title - b.membership_program.title,
            },
            {
              title: 'Store',
              dataIndex: 'store',
              render: (text: any) => renderLink(`/administration/store/${text.id}`, text.name),
              sorter: (a: any, b: any) => a.store - b.store
            },
            {
              title: 'Start Date',
              dataIndex: 'start_date',
              render: renderDateTime,
              sorter: (a: any, b: any) => a.start_date - b.start_date
            },
            {
              title: 'End Date',
              dataIndex: 'end_date',
              render: renderDateTime,
              sorter: (a: any, b: any) => a.end_date - b.end_date
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  type="delete"
                  tooltip="Remove"
                  queryService={QueryConstructor(() => StudentQueries.untagMembersipProgram({ data: { ids: [text] } }), [StudentQueries.untagMembersipProgram])}
                  refreshEventName="REFRESH_MEMBERSHIP_PROGRAM_TAB"
                />
              )
            },
          ],
          searchFunc: MembershipProgramQueries.getListByParticipant,
          searchParams: { profile: student.id, },
          refreshEventName: "REFRESH_MEMBERSHIP_PROGRAM_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Membership Program`}
              formMeta={MembershipProgramTaggingFormMeta}
              formSubmitApi={addMembershipProgram}
              buttonLabel={`Add Membership Program`}
              iconType="create"
              refreshEventName={'REFRESH_MEMBERSHIP_PROGRAM_TAB'}
            />
          ]
        }
      },
      helpKey: "productTab"
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
