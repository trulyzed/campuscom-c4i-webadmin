import { IQuery } from "./types"

export interface IStudentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getLookupData: IQuery
  update: IQuery
  getListByMembershipProgram: IQuery
  getListByCartItem: IQuery
  getListByContactGroup: IQuery
  tagMembersipProgram: IQuery
  untagMembersipProgram: IQuery
}