import { IQuery } from "./types"

export interface IPreferenceQueries {
  getPreferences: IQuery
  saveOrUpdatePreferences: IQuery
  deletePreferences: IQuery
}
