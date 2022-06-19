import { renderDateTime, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { StoreDomainConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/StoreDomainConfigurations"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { renderStoreDomainConfigurationStatus } from "./StoreDomainConfigurationDetailsMeta"

export const storeDomainConfigurationListTableColumns: TableColumnType = [
  {
    title: "Domain",
    dataIndex: "domain",
    render: (text: any, record: any) => renderLink(`/administration/store-domain-configuration/${record.id}`, text),
    sorter: (a: any, b: any) => a.domain - b.domain
  },
  {
    title: "Certificate Expires On",
    dataIndex: "expiry_at",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.expiry_at - b.expiry_at
  },
  {
    title: "Certificate Upload Date",
    dataIndex: "upload_at",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.upload_at - b.upload_at
  },
  {
    title: "Expiry Status",
    dataIndex: "expiry_status",
    render: (text: any, record: any) => renderStoreDomainConfigurationStatus(text, record.expiry_duration),
    sorter: (a: any, b: any) => a.status - b.status
  },
]

export const getStoreDomainConfigurationListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: storeDomainConfigurationListTableColumns,
    searchFunc: QueryConstructor((params) => StoreDomainConfigurationQueries.getList(params), [StoreDomainConfigurationQueries.getList]),
    tableName: 'StoreDomainConfiguration'
  }
}
