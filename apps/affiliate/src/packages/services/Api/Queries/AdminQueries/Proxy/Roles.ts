import { IQuery } from "./types"

export interface IRoleQueries {
  getSingle: IQuery
  getList: IQuery
  getPermissionList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
}