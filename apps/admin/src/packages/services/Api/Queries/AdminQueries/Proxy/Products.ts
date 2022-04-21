import { IQuery } from "./types"

export interface IProductQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  getRelatedProductList: IQuery
  untagRelatedProduct: IQuery
}