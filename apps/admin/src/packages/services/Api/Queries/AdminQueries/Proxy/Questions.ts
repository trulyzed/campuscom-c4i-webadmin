import { convertToString } from "~/packages/utils/string"
import { IQuery } from "./types"

export interface IQuestionQueries {
  getPaginatedList: IQuery
}

export const processQuestions = (data:{title: string; answer: string; type: string}[]): {question: string; answer: string; type: string}[] => {
  return data.map(i => ({
    question: convertToString(i.title, true),
    answer: i.answer,
    type: i.type,
  }))
}