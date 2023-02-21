import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { SkillQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Skills"
import { getSkillListTableColumns } from "~/TableSearchMeta/Skill/SkillListTableColumns"
import { SkillSearchMeta } from "~/TableSearchMeta/Skill/SkillSearchMeta"

const listMeta = getSkillListTableColumns()

export const List = () => {
  return (
    <SearchPage
      title={"Skills"}
      meta={SkillSearchMeta}
      tableProps={{
        ...listMeta,
        columns: [...listMeta.columns, {
          title: 'Acquired',
          dataIndex: 'acquired',
          render: renderBoolean,
          sorter: (a: any, b: any) => a.acquired - b.acquired,
        }],
        searchFunc: SkillQueries.getPaginatedList,
      }}
    />
  )
}
