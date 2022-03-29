import { IQuery } from "./types"

export interface IPublishingQueries {
  getSingle: IQuery
  getReadyType: IQuery
  getPaginatedList: IQuery
  update: IQuery
}