import { IQuery } from "./types"

export interface ICourseProviderQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getLookupData: IQuery
  create: IQuery
  update: IQuery
  generateApiKey: IQuery
}