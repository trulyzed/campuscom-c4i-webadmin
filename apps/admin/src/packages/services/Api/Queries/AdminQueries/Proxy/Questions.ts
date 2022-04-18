import { convertToString } from "~/packages/utils/mapper"
import { IQuery } from "./types"

export interface IQuestionQueries {
  getSingle: IQuery
  getList: IQuery
  getListByCourseProvider: IQuery
  create: IQuery
  update: IQuery
  delete: IQuery
  getProfileQuestionListByStore: IQuery
  getPaymentQuestionListByStore: IQuery
  untagProfileQuestion: IQuery
  untagPaymentQuestion: IQuery
}

export const processQuestions = (data:{title: string; answer: string; type: string}[]): {question: string; answer: string; type: string}[] => {
  return data.map(i => ({
    question: convertToString(i.title, true),
    ...i,
    answer: i.answer,
    type: i.type,
  }))
}