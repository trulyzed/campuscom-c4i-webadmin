import { IQuery } from "./types"

export interface IStoreConfigQueries {
  getSingle: IQuery
  getList: IQuery
  delete: IQuery
}
