import { IQuery } from "./types"

export interface IEnrollmentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}
