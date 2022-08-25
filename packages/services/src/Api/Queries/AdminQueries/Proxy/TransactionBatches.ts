import { IQuery } from "./types"

export interface ITransactionBatchQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  delete: IQuery
  download: IQuery
}
