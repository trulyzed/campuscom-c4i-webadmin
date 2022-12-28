import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderHtml, renderJson, renderLink, renderBoolean } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getQuestionFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionFormMeta"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { convertToString } from "@packages/utilities/lib/mapper"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { getQuestionTaggingFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionTaggingFormMeta"

export const getQuestionDetailsMeta = (question: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => QuestionQueries.update({ ...data, params: { id: question.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [QuestionQueries.update])

  const addQuestion = QueryConstructor(((data) => QuestionQueries.update({
    data: {
      configuration: {
        ...question.configuration,
        composite_data: [...question.configuration?.composite_data || [], ...!((question.configuration?.composite_data || []) as any[]).some(i => i.question === data?.data.question) ? [data?.data] : []]
      },
      question_type: question.question_type
    },
    params: { id: question.id }
  }).then(resp => {
    if (resp.success) {
      notification.success({ message: 'Question added' })
    }
    window.location.reload()
    return resp
  })), [QuestionQueries.update])

  const removeQuestion = QueryConstructor(((data) => QuestionQueries.update({
    data: {
      configuration: {
        ...question.configuration,
        composite_data: ((question.configuration?.composite_data || []) as any[]).filter(i => i.question !== data?.data.id)
      },
      question_type: question.question_type
    },
    params: { id: question.id }
  }).then(resp => {
    if (resp.success) {
      notification.success({ message: 'Question removed' })
    }
    window.location.reload()
    return resp
  })), [QuestionQueries.update])

  const questionsQuery = QueryConstructor(() => {
    const data = (question.configuration?.["composite_data"] || []) as any[]
    return Promise.all(data.sort((a, b) => a.order - b.order).map((i: any) => QuestionQueries.getSingle({ params: { id: i.question } }))).then(resp => ({
      code: 200,
      error: false,
      success: true,
      data: resp.map((i, idx) => ({
        ...i.data,
        title: i.data ? convertToString(i.data.title, true) : undefined,
        order: data[idx].order,
        options_data_index: data[idx].options_data_index,
        question: data[idx].question
      }))
    }))
  }, [QuestionQueries.getSingle])

  const summaryInfo: CardContainer = {
    title: `Question: ${convertToString(question.title, true)}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Question`}
        formMeta={getQuestionFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{
          ...question,
          provider_ref: question.provider?.id,
          autocomplete: question.configuration?.autocomplete,
          options: JSON.stringify(question.configuration?.options),
          multiple: question.configuration?.multiple,
          max_file_size: question.configuration?.max_file_size,
          file_types: question.configuration?.file_types,
          required: question.configuration?.required,
          default_value: question.configuration?.default_value,
          placeholder: question.configuration?.placeholder,
          help_text: question.configuration?.help_text,
          store: question.provider_type === 'store' ? question.provider?.id : undefined,
          course_provider: question.provider_type === 'course_provider' ? question.provider?.id : undefined,
        }}
        defaultFormValue={{ questionId: question.id }}
        buttonLabel={`Update Question`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Question"
        type="delete"
        redirectTo="/administration/question"
        queryService={QueryConstructor(() => QuestionQueries.delete({ data: { ids: [question.id] } }), [QuestionQueries.delete])}
      />
    ],
    contents: [
      { label: 'Title (rendered as)', value: renderHtml(question.title) },
      { label: 'Provider Type', value: question.provider_type },
      { label: 'Course Provider', value: question.provider_type === 'course_provider' ? renderLink(`/administration/course-provider/${question.provider.id}`, question.provider.name) : undefined },
      { label: 'Store', value: question.provider_type === 'store' ? renderLink(`/administration/store/${question.provider.id}`, question.provider.name) : undefined },
      { label: 'External ID', value: question.external_id },
      { label: 'Type', value: question.question_type },
      { label: 'Is Autocomplete', value: question.configuration?.autocomplete, render: renderBoolean },
      { label: 'Options', value: question.configuration?.options, render: renderJson },
      { label: 'Is Multiple', value: question.configuration?.multiple, render: renderBoolean },
      { label: 'Max File Size', value: question.configuration?.max_file_size },
      { label: 'Accepted File Types', value: question.configuration?.file_types },
      { label: 'Is Required', value: question.configuration?.required, render: renderBoolean },
      { label: 'Default Value', value: question.configuration?.default_value },
      { label: 'Placeholder', value: question.configuration?.placeholder },
      { label: 'Help Text', value: question.configuration?.help_text },
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
      helpKey: "questionSummaryTab"
    },
    ...question.question_type === 'composite' ? [{
      tabTitle: "Questions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Title",
              dataIndex: "title",
              render: (text: any, record: any) => renderLink(`/administration/question/${record.id}`, convertToString(text, true)),
              sorter: (a: any, b: any) => a.title - b.title
            },
            {
              title: "Options Data Index",
              dataIndex: "options_data_index",
              sorter: (a: any, b: any) => a.options_data_index - b.options_data_index
            },
            {
              title: "Order",
              dataIndex: "order",
              sorter: (a: any, b: any) => a.order - b.order
            },
            {
              title: "Action",
              dataIndex: 'action',
              render: (_, record: any) => (
                <ContextAction
                  type="delete"
                  tooltip="Remove Question"
                  queryService={QueryConstructor(() => removeQuestion({ data: { id: record.id } }), [removeQuestion])}
                />
              )
            }
          ],
          rowKey: "question",
          searchFunc: questionsQuery,
          searchParams: {},
          refreshEventName: "REFRESH_QUESTIONS_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Question`}
              formMeta={getQuestionTaggingFormMeta()}
              formSubmitApi={addQuestion}
              buttonLabel={`Add Question`}
            />
          ],
        }
      },
      helpKey: "questionsTab"
    }] as IDetailsTabMeta[] : [],
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: question.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Question Title - ${convertToString(question.title, true)}`,
    tabs: tabMetas
  }
}
