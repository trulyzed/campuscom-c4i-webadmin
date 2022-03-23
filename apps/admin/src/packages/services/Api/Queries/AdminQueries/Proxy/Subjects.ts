import { IQuery } from "./types"

export interface ISubjectQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}