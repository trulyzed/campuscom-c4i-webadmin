import { IQuery } from "./types"

export interface IIdentityProviderQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByStore: IQuery
}