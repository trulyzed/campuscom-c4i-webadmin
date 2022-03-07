import { AxiosRequestConfig } from "axios";
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"

export type DefaultQuery = 'getSingle' | 'getPaginatedList' | 'getList'
export type AuthQuery = 'login'
export type PreferenceQuery = 'getPreferences' | 'saveOrUpdatePreferences' | 'deletePreferences'

export type Query = DefaultQuery | AuthQuery | PreferenceQuery
export type IQueryFunc = (data?: Pick<AxiosRequestConfig, 'params' | 'data'>) => Promise<IApiResponse>;

export type IQuery<T extends Query = DefaultQuery> = Record<T, IQueryFunc>;