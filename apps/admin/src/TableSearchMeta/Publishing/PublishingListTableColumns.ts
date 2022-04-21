import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { PublishingQueries } from "~/packages/services/Api/Queries/AdminQueries/Publishings"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const publishingListTableColumns: TableColumnType = [
  {
    title: 'Course Title',
    dataIndex: 'title',
    render: (text: any, record: any) => renderLink(record.store ? `/store/publishing/${record.id}` : `/store/ready-publishing/${record.course_id}`, text),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => record.store ? renderLink(`/administration/store/${text.id}`, text.name) : text,
    sorter: (a: any, b: any) => a.store?.name - b.store?.name
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
    sorter: (a: any, b: any) => a.provider - b.provider
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a: any, b: any) => a.status - b.status,
  },
  {
    title: "Active Status",
    dataIndex: "active_status",
    render: renderBoolean
  }
]

export const getPublishingListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: publishingListTableColumns,
    searchFunc: QueryConstructor((params) => PublishingQueries.getPaginatedList(params), [PublishingQueries.getPaginatedList]),
  }
}
