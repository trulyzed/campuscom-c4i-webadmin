import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ADDED_SUCCESSFULLY, CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getSkillListTableColumns } from "~/TableSearchMeta/Career/SkillListTableColumns"
import { enrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { getEmployeeTransactionListTableColumns } from "~/TableSearchMeta/EmployeeTransaction/EmployeeTransactionListTableColumns"
import { getEmployeeTransactionFormMeta } from "~/Component/Feature/EmployeeTransactions/FormMeta/EmployeeTransactionFormMeta"
import { EmployeeTransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/EmployeeTransactions"
import { getSkillTaggingFormMeta } from "~/Component/Feature/Employees/FormMeta/SkillTaggingFormMeta"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Employees"

export const getEmployeeDetailsMeta = (employee: { [key: string]: any }): IDetailsMeta => {
  const createCredit = QueryConstructor(((data) => EmployeeTransactionQueries.create({ ...data, data: { ...data?.data, profile: employee.profile.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [EmployeeTransactionQueries.create])

  const tagSkill = QueryConstructor(((data) => EmployeeQueries.tagSkill({ ...data, data: { ...data?.data, employee: employee.profile.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: ADDED_SUCCESSFULLY })
    }
    return resp
  })), [EmployeeQueries.tagSkill])

  const summaryInfo: CardContainer = {
    title: `Employee: ${employee.name}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${employee.store.id}`, employee.store.name), },
      { label: 'First name', value: employee.profile.first_name, },
      { label: 'Last name', value: employee.profile.last_name, },
      { label: 'Username', value: employee.username, },
      { label: 'Email', value: employee.profile.primary_email, },
      { label: 'Primary contact number', value: employee.profile.primary_contact_number, },
      { label: 'Organizations', value: renderLink(`/administration/organization/${employee.company.id}`, employee.company.name) },
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
      helpKey: "employeeSummaryTab"
    },
    {
      tabTitle: "Company Credits",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getEmployeeTransactionListTableColumns(),
          searchParams: { profile: employee.profile.id },
          refreshEventName: "REFRESH_COMPANY_CREDIT_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Credit`}
              formMeta={getEmployeeTransactionFormMeta()}
              formSubmitApi={createCredit}
              buttonLabel={`Create Credit`}
              iconType="create"
              refreshEventName={'REFRESH_COMPANY_CREDIT_LIST'}
            />
          ]
        }
      },
      helpKey: "companyCreditsTab"
    },
    {
      tabTitle: "Skills",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSkillListTableColumns(),
          searchFunc: QueryConstructor((params) => EmployeeQueries.getSingle(params).then(resp => resp.success ? ({
            ...resp,
            data: resp.data.skills
          }) : resp), [EmployeeQueries.getSingle]),
          searchParams: { id: employee.id },
          refreshEventName: "REFRESH_SKILL_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Skill`}
              formMeta={getSkillTaggingFormMeta(employee.profile.id)}
              formSubmitApi={tagSkill}
              buttonLabel={`Add Skill`}
              refreshEventName={'REFRESH_SKILL_LIST'}
            />
          ]
        }
      },
      helpKey: "skillsTab"
    },
    {
      tabTitle: "Enrollments",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: enrollmentListTableColumns,
          searchFunc: EnrollmentQueries.getCourseEnrollmentList,
          searchParams: {},
          rowKey: 'id',
        }
      },
      helpKey: "enrollmentTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: employee.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Employee Title - ${employee.name}`,
    tabs: tabMetas
  }
}
