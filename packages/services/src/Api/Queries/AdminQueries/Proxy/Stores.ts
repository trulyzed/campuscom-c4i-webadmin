import { IQuery } from "./types"

export interface IStoreQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  getListByCoursePublishing: IQuery
  create: IQuery
  update: IQuery
  tagIdentityProvider: IQuery
  untagIdentityProvider: IQuery
  tagPaymentGateway: IQuery
  untagPaymentGateway: IQuery
  tagConfiguration: IQuery
  tagProfileQuestion: IQuery
  untagProfileQuestion: IQuery
  updateConfiguration: IQuery
  tagPaymentQuestion: IQuery
}
