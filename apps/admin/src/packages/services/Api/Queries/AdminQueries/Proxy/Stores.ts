import { IQuery } from "./types"

export interface IStoreQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  getListByCoursePublishing: IQuery
}