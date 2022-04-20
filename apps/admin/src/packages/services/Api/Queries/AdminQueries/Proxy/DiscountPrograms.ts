import { IQuery } from "./types"

export interface IDiscountProgramQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getListByCartItem: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
  delete: IQuery
  untagProduct: IQuery
  getListByMembershipProgram: IQuery
}