import { IQuery } from "./types"

export interface IStoreQueries {
  getSingle: IQuery
  getList: IQuery
  getLookupData: IQuery
}