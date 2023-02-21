import { TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { SkillQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Skills"

export const skillListTableColumns: TableColumnType = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: 'Skill Type',
    dataIndex: 'skill_type',
    sorter: (a: any, b: any) => a.skill_type - b.skill_type,
  },
]

export const getSkillListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: skillListTableColumns,
    searchFunc: SkillQueries.getPaginatedList,
    tableName: 'Skill'
  }
}
