import { AxiosRequestConfig } from "axios";
import { IApiPermission, IApiResponse } from "~/packages/services/Api/utils/Interfaces"

interface IQueryParams extends Pick<AxiosRequestConfig, 'params' | 'data' | 'headers'> {}

export interface IPublicQuery {(data?: IQueryParams) : Promise<IApiResponse>}
export interface IQuery {(data?: IQueryParams) : Promise<IApiResponse>, __permission: IApiPermission}
