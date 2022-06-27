import { IQuery } from "./types"

export interface IAuditTrailQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}