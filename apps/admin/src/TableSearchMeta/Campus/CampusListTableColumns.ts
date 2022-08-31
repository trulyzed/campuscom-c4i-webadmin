import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { CampusQueries } from "~/packages/services/Api/Queries/AdminQueries/Campuses"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const campusListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/course-provider/campus/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Provider",
    dataIndex: 'provider',
    render: (text: any, record: any) => renderLink(`/administration/course-provider/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.provider - b.provider
  },
]

export const getCampusListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: campusListTableColumns,
    searchFunc: QueryConstructor((params) => CampusQueries.getPaginatedList(params), [CampusQueries.getList]),
    tableName: 'Campus'
  }
}
