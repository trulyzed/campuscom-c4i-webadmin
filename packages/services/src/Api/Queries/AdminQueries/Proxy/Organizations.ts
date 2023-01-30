import { IQuery } from "./types"

export interface IOrganizationQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
}
