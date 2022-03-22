import { renderBoolean, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { QuestionQueries } from "~/packages/services/Api/Queries/AdminQueries/Questions"

export const questionListTableColumns: TableColumnType = [
  {
    title: "Question",
    dataIndex: "question",
    //render: (text: any, record: any) => renderLink(`/institute/course/${record.id}`, text, isModal),
    sorter: (a: any, b: any) => a.question - b.question
  },
  {
    title: "Answer",
    dataIndex: 'answer',
    render: (text: any, record: any) => typeof text === 'boolean' ? renderBoolean(text) : text,
    sorter: (a: any, b: any) => a.answer - b.answer
  },
]

export const getQuestionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: questionListTableColumns,
    searchFunc: QueryConstructor((params) => QuestionQueries.getPaginatedList(params), [QuestionQueries.getPaginatedList]),
  }
}
