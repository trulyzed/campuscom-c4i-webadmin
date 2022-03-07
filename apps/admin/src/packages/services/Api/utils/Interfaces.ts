import { ApiPermissionAction, ApiPermissionClass, PermissionContext } from "~/packages/services/Api/Enums/Permission"

export interface IApiPermission {
  action: `${ApiPermissionAction}`;
  operation: `${ApiPermissionClass}`;
}
export interface IPermissionContext { type: `${PermissionContext}`, values: string[] }

export interface IUser {
  username: string;
  email: string;
  is_superuser: boolean;
  mfa_enabled: boolean;
  permissions: IApiPermission[];
  context: IPermissionContext;
  menu_permissions: string[];
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

export const RESPONSE_TYPE = {
  EXCEL: "__downloadDataAsEXCEL",
  CSV: "__downloadDataAsCSV",
  PDF: "__downloadDataAsPDF"
}
