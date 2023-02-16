import { IQuery } from "./types"

export interface ISkillQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
}
