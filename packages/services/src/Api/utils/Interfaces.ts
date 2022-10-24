import { ApiPermissionAction, ApiPermissionClass, PermissionContext } from "~/Api/Enums/Permission"

export type IApiPermission =
  | {
      action: `${ApiPermissionAction}`
      operation: `${ApiPermissionClass}`
      is_public?: false
    }
  | {
      is_public: true
    }

export interface IPermissionContext {
  type: `${PermissionContext}`
  values: {
    id: string
    name: string
    primary_course_provider: {
      id: string
      name: string
    } | null
  }[]
}

export interface IUser {
  fullname: string
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
  mfa_enabled: boolean
  permissions: IApiPermission[]
  context: IPermissionContext[]
  menu_permissions: string[]
}

export interface ApiConfig {
  baseURL?: undefined | string
  url?: string
  method?: string
  headers?: any
  params?: any
  data?: any
  responseType?: any
}

export enum ErrorType {
  GLOBAL,
  CUSTOM
}

export type RoleType =
  | "everybody"
  | "administrator"
  | "registrar"
  | "academicStaff"
  | "seniorAcademicStaff"
  | "bursar"
  | "coordinator"
  | "retail"
  | "developer"
  | "override"
  | "registrar2"
  | "bursar2"
  | "readonly"

export interface IApiResponse {
  code: number
  data: any
  error: any
  success: boolean
  cacheEntryTime?: number
}
