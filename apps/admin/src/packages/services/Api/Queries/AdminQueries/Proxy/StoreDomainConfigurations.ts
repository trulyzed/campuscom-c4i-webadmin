import { IQuery } from "./types"

export interface IStoreDomainConfigurationQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
}