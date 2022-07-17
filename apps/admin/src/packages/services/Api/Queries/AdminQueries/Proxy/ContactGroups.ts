import { IQuery } from "./types"

export interface IContactGroupQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  tagProfile: IQuery
  untagProfile: IQuery
}