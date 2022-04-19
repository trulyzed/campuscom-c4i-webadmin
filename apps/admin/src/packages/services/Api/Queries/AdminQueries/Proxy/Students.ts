import { IQuery } from "./types"

export interface IStudentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  update: IQuery
  getListByMembershipProgram: IQuery
  tagMembersipProgram: IQuery
  untagMembersipProgram: IQuery
}