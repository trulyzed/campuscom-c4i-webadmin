import { renderBoolean, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CertificatePublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CertificatePublishings"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const certificatePublishingListTableColumns: TableColumnType = [
  {
    title: 'Certificate Title',
    dataIndex: 'title',
    render: (text: any, record: any) => renderLink(record.store ? `/store/publishing/certificate/${record.id}` : `/store/ready-certificate-publishing/${record.certificate_id}`, text),
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

export const getCertificatePublishingListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: certificatePublishingListTableColumns,
    searchFunc: QueryConstructor((params) => CertificatePublishingQueries.getPaginatedList(params), [CertificatePublishingQueries.getPaginatedList]),
    tableName: 'CertificatePublishing'
  }
}
