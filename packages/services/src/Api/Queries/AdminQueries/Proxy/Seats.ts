import { IQuery } from "./types"

export interface ISeatQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getHistoryList: IQuery
}
