import { IQuery } from "./types"

export interface ICourseQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  create: IQuery
  update: IQuery
}