import { IQuery } from "./types"

export interface IAuthQueries {
  login: IQuery
  changePassword: IQuery
  getMFA: IQuery
  enableMFA: IQuery
  disableMFA: IQuery
}
