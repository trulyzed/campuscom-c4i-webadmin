import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderHtml, renderThumb, renderLink } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { CourseProviderFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/CourseProviderFormMeta"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { getProfileQuestionTaggingFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/ProfileQuestionTaggingFormMeta"
import { SummaryTablePopover } from "@packages/components/lib/Popover/SummaryTablePopover"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getCourseProviderDetailsMeta = (courseProvider: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CourseProviderQueries.update({ ...data, params: { id: courseProvider.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseProviderQueries.update])

  const addProfileQuestion = QueryConstructor(((data) => CourseProviderQueries.tagProfileQuestion({ ...data, data: { ...data?.data, course_provider: courseProvider.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseProviderQueries.tagProfileQuestion])

  const generateApiKey = QueryConstructor(() => CourseProviderQueries.generateApiKey({ data: { course_provider_id: courseProvider.id, name: `${courseProvider.name} API key` } }).then(resp => {
    if (resp.success) {
      notification.success({
        message: 'API key',
        description: (
          <div>
            <p>The API key can be copied once. Store the key in a safe place. If the key is lost, it should be revoked and a new one needs to be created.</p>
            <CopyToClipboard text={resp.data.key}>
              <h3 style={{ cursor: 'pointer' }} title="Click to copy">{resp.data.key}</h3>
            </CopyToClipboard>
          </div>
        ),
        duration: 0,
        top: 100
      })
    }
    return resp
  }), [CourseProviderQueries.generateApiKey])

  const summaryInfo: CardContainer = {
    title: `Course Provider: ${courseProvider.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Course Provider`}
        formMeta={CourseProviderFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...courseProvider, configuration: JSON.stringify(courseProvider.configuration) }}
        defaultFormValue={{ courseProviderId: courseProvider.id }}
        buttonLabel={`Update Course Provider`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction type="generateKey" tooltip="Generate API key" onClick={generateApiKey} />
    ],
    contents: [
      { label: 'Name', value: courseProvider.name, },
      { label: 'Code', value: courseProvider.code, },
      { label: 'Summary', value: renderHtml(courseProvider.summary), },
      { label: 'Website', value: courseProvider.website_url, },
      { label: 'Description', value: renderHtml(courseProvider.description), },
      { label: 'Logo', value: renderThumb(courseProvider.course_provider_logo_uri, "Course Provider's logo"), },
      { label: 'Refund Email', value: courseProvider.refund_email, },
      {
        label: 'Configuration', render: () => (
          <SummaryTablePopover card={{
            title: 'Configuration',
            contents: [
              {
                label: 'ERP',
                value: courseProvider.configuration?.erp
              },
              {
                label: 'Enrollment URL',
                value: renderLink(courseProvider.configuration?.enrollment_url, courseProvider.configuration?.enrollment_url, undefined, true)
              },
            ]
          }} />
        ),
      },
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
      helpKey: "courseProviderSummaryTab",
    },
    {
      tabTitle: "Profile Questions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Title",
              dataIndex: "question",
              render: (text: any, record: any) => renderLink(`/administration/question/${record.question_bank}`, text),
              sorter: (a: any, b: any) => a.question - b.question
            },
            {
              title: "Respondent Type",
              dataIndex: "respondent_type",
              sorter: (a: any, b: any) => a.respondent_type - b.respondent_type
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_PROFILE_QUESTION_LIST"
                  queryService={QueryConstructor(() => CourseProviderQueries.untagProfileQuestion({ data: { ids: [text] } }), [CourseProviderQueries.untagProfileQuestion])}
                />
              )
            },
          ],
          searchFunc: QuestionQueries.getListByCourseProvider,
          searchParams: { provider_type: 'course_provider', provider_ref: courseProvider.id },
          refreshEventName: "REFRESH_PROFILE_QUESTION_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Profile Question`}
              formMeta={getProfileQuestionTaggingFormMeta(courseProvider.id)}
              formSubmitApi={addProfileQuestion}
              buttonLabel={`Create Profile Question`}
              iconType="create"
              refreshEventName={'REFRESH_PROFILE_QUESTION_LIST'}
            />
          ]
        }
      },
      helpKey: "profileQuestionsTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: courseProvider.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Course Provider Title - ${courseProvider.name}`,
    tabs: tabMetas
  }
}
