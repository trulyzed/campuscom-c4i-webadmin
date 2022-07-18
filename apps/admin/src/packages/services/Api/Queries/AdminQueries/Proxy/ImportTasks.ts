import { IQuery } from "./types"

export interface IImportTaskQueries {
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  requeue: IQuery
}