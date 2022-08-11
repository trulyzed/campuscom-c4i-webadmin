import { GLOBAL_ERROR_MESSAGES } from './ErrorMessages'

type GeneralApiError = {
  error: {message: string}
}

type GeneralApiError2 = {
  message: string
}

type DataOperationApiError = {
  errors: [{
    field_errors: {
      [key: string]: string
    },
    non_field_errors: string
  },
  {
    message: string
  }]
}

type ApiError = GeneralApiError | GeneralApiError2 | DataOperationApiError | undefined


export interface ISimplifiedApiErrorMessage {
  code?: number
  isGlobal?: boolean
  propertyName?: string
  message: string
}

export interface IApiErrorProcessor {
  getErrorMessages: () => Array<ISimplifiedApiErrorMessage>
}

export default class ApiErrorProcessor implements IApiErrorProcessor {
  private defaultErrorMessage = GLOBAL_ERROR_MESSAGES[503]
  private isGlobalError = this.httpStatusCode in GLOBAL_ERROR_MESSAGES;

  constructor(private error: ApiError, private httpStatusCode: number) {}

  getErrorMessages(): Array<ISimplifiedApiErrorMessage> {
    const errorMessages: Array<ISimplifiedApiErrorMessage> = []

    if (this.error) {
      if ('error' in (this.error)) {
        errorMessages.push({message: this.error.error.message, code: this.httpStatusCode, isGlobal: this.isGlobalError})
      }
      if ('message' in this.error) {
        errorMessages.push({message: this.error.message, code: this.httpStatusCode, isGlobal: this.isGlobalError})
      }
      if ('errors' in this.error) {
        errorMessages.push(...this._processDataOperationErrors(this.error.errors))
      }
    } else errorMessages.push({message: GLOBAL_ERROR_MESSAGES[(this.httpStatusCode as keyof typeof GLOBAL_ERROR_MESSAGES)] || this.defaultErrorMessage, code: this.httpStatusCode, isGlobal: this.isGlobalError})
    return errorMessages
  }

  _processDataOperationErrors = (errors: DataOperationApiError['errors']): ISimplifiedApiErrorMessage[] => {
    const error = errors.find(e => 'field_errors' in e) as (typeof errors)[0]
    const message = errors.find(e => 'message' in e) as (typeof errors)[1]
    const arr: ISimplifiedApiErrorMessage[] = []

    if (message.message) arr.push({message: message.message, isGlobal: this.isGlobalError, code: this.httpStatusCode})
    if (error.non_field_errors) arr.push({message: error.non_field_errors})
    if (error.field_errors) {
      for (const key in error.field_errors) {
        error.field_errors[key] && arr.push({message: `${key}: ${error.field_errors[key]}`})
      }
    }

    return arr;
  }
}
