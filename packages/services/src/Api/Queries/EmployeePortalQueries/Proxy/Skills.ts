import { IQuery } from "./types"

export interface ISkillQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getLookupData: IQuery
  getListByCourse: IQuery
  makeComplete: IQuery
}
