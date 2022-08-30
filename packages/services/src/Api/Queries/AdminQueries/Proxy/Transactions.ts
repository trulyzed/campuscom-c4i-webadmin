import { IQuery } from "./types"

export interface ITransactionQueries {
  getList: IQuery
  getBatchableList: IQuery
  getTransactionReportList: IQuery
}
