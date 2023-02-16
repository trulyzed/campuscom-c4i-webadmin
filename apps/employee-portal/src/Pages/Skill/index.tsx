import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
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
        searchFunc: QueryConstructor((params) => SkillQueries.getPaginatedList(params).then(resp => {
          return {
            code: 200,
            data: [
              { id: "1dba9373-399e-43df-aafa-b29a14a38153", name: 'aws', skill_type: 'technology', acquired: true },
              { id: "1dba9373-399e-43df-aafa-b29a14a38f53", name: 'javascript', skill_type: 'technology', acquired: false },
            ],
            error: false,
            success: true
          }
        }), [SkillQueries.getList]),
      }}
    />
  )
}
