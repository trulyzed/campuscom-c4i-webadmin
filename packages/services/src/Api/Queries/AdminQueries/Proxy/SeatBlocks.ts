import { IQuery } from "./types"

export interface ISeatBlockQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  generateIndividualTokens: IQuery
  removeRegistration: IQuery
  swapRegistration: IQuery
}
