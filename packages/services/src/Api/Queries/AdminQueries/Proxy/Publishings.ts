import { IQuery } from "./types"

export interface IPublishingQueries {
  getSingle: IQuery
  getSingleWithTaggedSubjects: IQuery
  getReadyType: IQuery
  getPaginatedList: IQuery
  update: IQuery
}
