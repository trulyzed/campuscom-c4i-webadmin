import { IQuery } from "./types"

export interface IScheduleQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}