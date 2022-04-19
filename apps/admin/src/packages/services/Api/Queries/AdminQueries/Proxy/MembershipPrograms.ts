import { IQuery } from "./types"

export interface IMembershipProgramQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
  delete: IQuery
  getListByParticipant: IQuery
  tagDiscountProgram: IQuery
  untagDiscountProgram: IQuery
}