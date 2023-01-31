import { IQuery } from "./types"

export interface IEmployeeQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
}
