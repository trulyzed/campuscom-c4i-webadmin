import { IQuery } from "./types"

export interface IRefundQueries {
  getSingle: IQuery
  getList: IQuery
  cancelEnrollment: IQuery
  updateTaxRecord: IQuery
  sendInformationToCRM: IQuery
}