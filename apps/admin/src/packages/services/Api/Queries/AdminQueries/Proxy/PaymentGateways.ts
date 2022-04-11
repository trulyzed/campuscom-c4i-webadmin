import { IQuery } from "./types"

export interface IPaymentGatewayQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByStore: IQuery
  getLookupData: IQuery
}