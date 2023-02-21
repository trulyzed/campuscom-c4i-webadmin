import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
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
        columns: [
          ...listMeta.columns,
          {
            title: 'Acquired',
            dataIndex: 'status',
            render: (text: any) => renderBoolean(text === "acquired"),
            sorter: (a: any, b: any) => a.acquired - b.acquired,
          },
          {
            title: "Action",
            dataIndex: 'action',
            render: (_, record: any) => record.status === 'not_acquired' ? (
              <ContextAction
                type="approve"
                tooltip="Mark as complete"
                queryService={QueryConstructor(() => SkillQueries.makeComplete({ data: { id: record.id } }), [SkillQueries.makeComplete])}
                refreshEventName="REFRESH_SKILL_LIST"
                confirmationType="marking"
                confirmationText="Mark this skill as complete?"
              />
            ) : undefined
          }
        ],
        searchFunc: SkillQueries.getPaginatedList,
        refreshEventName: "REFRESH_SKILL_LIST"
      }}
    />
  )
}
