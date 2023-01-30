import { IQuery } from "./types"

export interface IOrganizationTypeQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
}
