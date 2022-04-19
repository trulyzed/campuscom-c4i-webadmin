import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { GlobalConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/GlobalConfigurations"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const globalConfigurationListTableColumns: TableColumnType = [
  {
    title: "Label",
    dataIndex: "label",
    render: (text: any, record: any) => renderLink(`/configuration/global-configuration/${record.id}`, text),
    sorter: (a: any, b: any) => a.label - b.label
  },
]

export const getGlobalConfigurationListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: globalConfigurationListTableColumns,
    searchFunc: QueryConstructor((params) => GlobalConfigurationQueries.getPaginatedList(params), [GlobalConfigurationQueries.getList]),
  }
}
