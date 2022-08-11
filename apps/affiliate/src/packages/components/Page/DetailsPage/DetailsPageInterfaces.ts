import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"

export interface IDetailsSummary {
  summary: CardContainer[]
  actions?: JSX.Element[]
}

export type CardContents = {
  label: string
  value?: any
  cssClass?: string
  jsx?: JSX.Element
  render?: (text: any) => string | JSX.Element
}

export type CardContainer = {
  title?: string
  contents?: CardContents[]
  cardActions?: JSX.Element[]
  groupedContents?: CardContainer[]
}
// ================================================
export interface IStandardDetailsPage {
  getDetailsPageContentMeta: (Params: any) => CardContainer[]
  getDetailsPageContentFunc?: () => Promise<IApiResponse>
  dataLoaded?: { [key: string]: any }
  cardActions?: JSX.Element[]
  actions?: JSX.Element[]
}
