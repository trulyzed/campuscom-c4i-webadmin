import { IQuery } from "./types"

export interface IOrderQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  create: IQuery
  createBulk: IQuery
  getCreatableOrderDetails: IQuery
  getCreatableOrderPaymentSummary: IQuery
}
