import { IQuery } from "./types"

export interface IEmployeeTransactionQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  create: IQuery
}
