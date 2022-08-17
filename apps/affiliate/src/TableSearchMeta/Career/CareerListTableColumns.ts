import { renderBoolean, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { CareerQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Careers"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const careerListTableColumns: TableColumnType = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: any, record: any) => record.id ? renderLink(`/administration/career/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: 'SOC code',
    dataIndex: 'soc_code',
    sorter: (a: any, b: any) => a.soc_code - b.soc_code,
  },
  {
    title: 'Bright Outlook',
    dataIndex: 'bright_outlook',
    render: (text) => renderBoolean(text === 'True' ? true : text === 'False' ? false : text),
    sorter: (a: any, b: any) => a.bright_outlook - b.bright_outlook,
  },
  {
    title: 'Green',
    dataIndex: 'green',
    render: (text) => renderBoolean(text === 'True' ? true : text === 'False' ? false : text),
    sorter: (a: any, b: any) => a.green - b.green,
  },
]

export const getCareerListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: careerListTableColumns,
    searchFunc: QueryConstructor((params) => CareerQueries.getPaginatedList(params), [CareerQueries.getList]),
    tableName: 'Career'
  }
}
