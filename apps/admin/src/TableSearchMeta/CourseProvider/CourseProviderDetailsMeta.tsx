import { message, notification } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderHtml, renderJson, renderThumb, renderLink } from "~/packages/components/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { CourseProviderFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/CourseProviderFormMeta"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
// import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
// import { getQuestionListTableColumns } from "../Question/QuestionListTableColumns"
import { QuestionQueries } from "~/packages/services/Api/Queries/AdminQueries/Questions"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { getProfileQuestionTaggingFormMeta } from "~/Component/Feature/CourseProviders/FormMeta/ProfileQuestionTaggingFormMeta"
// import { QuestionFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionFormMeta"

export const getCourseProviderDetailsMeta = (courseProvider: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CourseProviderQueries.update({ ...data, params: { id: courseProvider.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [CourseProviderQueries.update])

  const addProfileQuestion = QueryConstructor(((data) => CourseProviderQueries.tagProfileQuestion({ ...data, data: { ...data?.data, course_provider: courseProvider.id } }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
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

  // const addProfileQuestion = QueryConstructor(((data) => QuestionQueries.create({ ...data, data: { ...data?.data, course: courseProvider.id } }).then(resp => {
  //   if (resp.success) {
  //     message.success(CREATE_SUCCESSFULLY)
  //   }
  //   return resp
  // })), [QuestionQueries.create])

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
      <IconButton
        toolTip="Generate API key"
        iconType="key"
        onClick={generateApiKey}
      />,
      // <IconButton
      //   toolTip="Delete Program Offering"
      //   iconType="remove"
      //   redirectTo="/administration/course-provider"
      //   onClickRemove={() => CourseProviderQueries.delete({ data: { ids: [courseProvider.id] } })}
      // />
    ],
    contents: [
      { label: 'Name', value: courseProvider.name, },
      { label: 'Code', value: courseProvider.code, },
      { label: 'Summary', value: renderHtml(courseProvider.summary), },
      { label: 'Website', value: courseProvider.website_url, },
      { label: 'Description', value: renderHtml(courseProvider.description), },
      { label: 'Logo', value: renderThumb(courseProvider.course_provider_logo_uri, "Course Provider's logo"), },
      { label: 'Refund Email', value: courseProvider.refund_email, },
      { label: 'Configuration', value: renderJson(courseProvider.configuration), },
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
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_PROFILE_QUESTION_LIST"
                  onClickRemove={() => CourseProviderQueries.untagProfileQuestion({ data: { ids: [text] } })}
                />
              )
            },
          ],
          searchFunc: QuestionQueries.getListByCourseProvider,
          searchParams: { provider_type: 'course_provider', provider_ref: courseProvider.id },
          refreshEventName: "REFRESH_PROFILE_QUESTION_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Profile Question`}
              formMeta={getProfileQuestionTaggingFormMeta(courseProvider.id)}
              formSubmitApi={addProfileQuestion}
              buttonLabel={`Add Profile Question`}
              iconType="create"
              refreshEventName={'REFRESH_PROFILE_QUESTION_LIST'}
            />
          ]
        }
      },
      helpKey: "profileQuestionsTab"
    },
  ]

  return {
    pageTitle: `Course Provider Title - ${courseProvider.name}`,
    tabs: tabMetas
  }
}
