import { IQuery } from "./types"

export interface IDepartmentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
}
