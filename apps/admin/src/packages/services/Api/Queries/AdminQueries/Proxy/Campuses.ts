import { IQuery } from "./types"

export interface ICampusQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}