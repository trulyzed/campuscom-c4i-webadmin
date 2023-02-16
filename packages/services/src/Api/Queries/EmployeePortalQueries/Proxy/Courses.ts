import { IQuery } from "./types"

export interface ICourseQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  enroll: IQuery
}
