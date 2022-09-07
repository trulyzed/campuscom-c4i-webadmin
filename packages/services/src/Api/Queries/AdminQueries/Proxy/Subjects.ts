import { IQuery } from "./types"

export interface ISubjectQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getListByCourse: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
}
