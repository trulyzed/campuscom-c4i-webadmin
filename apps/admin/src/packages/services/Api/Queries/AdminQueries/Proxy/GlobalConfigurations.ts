import { IQuery } from "./types"

export interface IGlobalConfigurationQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  getLookupDataOfAcceptedFileTypeOfAttachmentQuestion: IQuery
}