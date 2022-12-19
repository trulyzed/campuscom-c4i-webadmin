import { IQuery } from "./types"

export interface IRefundQueries {
  getSingle: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  cancelEnrollment: IQuery
  updateTaxRecord: IQuery
  sendInformationToCRM: IQuery
}
