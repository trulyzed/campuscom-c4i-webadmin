import { AxiosRequestConfig } from "axios"
import { IApiPermission, IApiResponse } from "~/Api/utils/Interfaces"

export interface IQueryParams extends Pick<AxiosRequestConfig, "params" | "data" | "headers"> {}
export interface IQuery {
  (data?: IQueryParams): Promise<IApiResponse>
  __permissions: IApiPermission[]
}
