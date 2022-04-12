import { IQuery } from "./types"

export interface IPaymentGatewayConfigQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getLookupData: IQuery
}