import { IQuery } from "./types"

export interface ICompanyQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
  delete: IQuery
}
