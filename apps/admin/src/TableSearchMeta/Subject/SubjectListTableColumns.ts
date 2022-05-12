import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const subjectListTableColumns: TableColumnType = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text: any, record: any) => renderLink(`/store/subject/${record.id}`, text),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store - b.store
  },
  {
    title: 'Is Published',
    dataIndex: 'is_published',
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_published - b.is_published,
  },
]

export const getSubjectListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: subjectListTableColumns,
    searchFunc: QueryConstructor((params) => SubjectQueries.getPaginatedList(params), [SubjectQueries.getList]),
    tableName: 'Subject'
  }
}
