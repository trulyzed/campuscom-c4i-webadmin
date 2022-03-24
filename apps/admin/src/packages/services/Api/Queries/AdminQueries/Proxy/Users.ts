import { IQuery } from "./types"

export interface IUserQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByStore: IQuery
}