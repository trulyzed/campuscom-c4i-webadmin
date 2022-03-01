import { AxiosRequestConfig } from "axios";
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export type CommonQueryNameType = 'getSingle' | 'getPaginatedList' | 'getList'
export type AuthQueryNameType = 'login'

export type QueryNameType = CommonQueryNameType | AuthQueryNameType

export type IQueryFunc = (data?: Pick<AxiosRequestConfig, 'params' | 'data'>) => Promise<IApiResponse>;

export type IQuery = Partial<Record<QueryNameType, IQueryFunc>>