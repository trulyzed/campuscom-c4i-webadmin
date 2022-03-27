import { IQuery } from "./types"

export interface IInstructorQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
}