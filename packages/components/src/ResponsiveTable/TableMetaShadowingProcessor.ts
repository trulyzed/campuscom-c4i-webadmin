import { PreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Preferences";
import { putSpaceBetweenCapitalLetters } from "@packages/utilities/lib/util"
import { TableColumnType } from "."

export interface IUserTableMetaConfig {
  hidden?: boolean
  columnPosition?: number
  title?: string
  defaultSortOrder?: "descend" | "ascend" | null
}

async function getUserTableMetaConfig(tableName?: string): Promise<{ [key: string]: any }> {
  if (!tableName) return Promise.resolve({})
  const response = await PreferenceQueries.getPreferences({ params: { table_name: tableName }})
  if (!response.data || response.data === "") return Promise.resolve({})

  const userFormMeta: { [key: string]: any } = response.data

  if (userFormMeta && Object.keys(userFormMeta).length > 0) {
    Object.keys(userFormMeta).forEach((key: string) => {
      const config = userFormMeta[key]
      if (
        !(
          ("title" in config && typeof config["title"] === "string") ||
          ("columnPosition" in config && typeof config["columnPosition"] === "number") ||
          ("defaultSortOrder" in config && (config["defaultSortOrder"] === "descend" || config["defaultSortOrder"] === "ascend" || config["defaultSortOrder"] === null)) ||
          ("hidden" in config && typeof config["hidden"] === "boolean")
        )
      ) {
        // console.log("deleting this invalid key ", key, userFormMeta[key])
        delete userFormMeta[key]
      }
    })
  }
  return Promise.resolve(userFormMeta)
}

function TableMetaShadowingProcessor(columns: TableColumnType, userMetaConfig: { [key: string]: any }): TableColumnType {
  return columns
    .map((x) => {
      if (userMetaConfig && x.dataIndex && typeof x.dataIndex === "string" && userMetaConfig[x.dataIndex]) {
        const title = userMetaConfig[x.dataIndex] && userMetaConfig[x.dataIndex].title ? userMetaConfig[x.dataIndex].title : x.title
        x = {
          ...x,
          ...userMetaConfig[x.dataIndex],
          title: typeof title === "string" ? putSpaceBetweenCapitalLetters(title) : title
        }
      }
      if ((x.title === "" || !x.title) && (!!x.dataIndex || !!x.render)) {
        x.columnPosition = 0
      }
      return x
    })
    .filter((x) => {
      return x && !x.hidden && Object.keys(x).length > 0
    })
    .sort((a, b) => (a.columnPosition || 1000) - (b.columnPosition || 1000))
}

export function processTableMetaWithUserMetaConfig(columns: TableColumnType, tableName?: string): Promise<TableColumnType> {
  return getUserTableMetaConfig(tableName).then((x) => TableMetaShadowingProcessor(columns, x))
}
