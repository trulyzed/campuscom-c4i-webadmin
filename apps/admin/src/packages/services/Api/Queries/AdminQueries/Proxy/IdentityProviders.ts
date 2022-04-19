import { IQuery } from "./types"

export interface IIdentityProviderQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  getListByStore: IQuery
  getLookupData: IQuery
}