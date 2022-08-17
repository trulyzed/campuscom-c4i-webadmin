import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { convertToString } from "@packages/utilities/lib/mapper"

export const questionListTableColumns: TableColumnType = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text: any, record: any) => renderLink(`/administration/question/${record.id}`, convertToString(text, true)),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: "Type",
    dataIndex: 'question_type',
    sorter: (a: any, b: any) => a.question_type - b.question_type
  },
]

export const getQuestionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: questionListTableColumns,
    searchFunc: QueryConstructor((params) => QuestionQueries.getList(params), [QuestionQueries.getList]),
    tableName: 'Question'
  }
}
