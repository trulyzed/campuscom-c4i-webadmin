import { IQuery } from "./types"

export interface ITransactionBatchQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  delete: IQuery
  download: IQuery
  makePayment: IQuery
}
