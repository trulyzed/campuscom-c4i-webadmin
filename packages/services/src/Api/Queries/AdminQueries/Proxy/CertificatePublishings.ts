import { IQuery } from "./types"

export interface ICertificatePublishingQueries {
  getSingle: IQuery
  getReadyType: IQuery
  getPaginatedList: IQuery
  update: IQuery
}
