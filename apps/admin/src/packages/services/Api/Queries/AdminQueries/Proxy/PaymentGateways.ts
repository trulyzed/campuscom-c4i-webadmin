import { IQuery } from "./types"

export interface IPaymentGatewayQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByStore: IQuery
  getSingleByStore: IQuery
  getLookupData: IQuery
}