import { IQuery } from "./types"

export interface IPaymentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getListByOrder: IQuery
}
