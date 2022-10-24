import { IField, IFieldType } from "~/Form/common"
import { parseReactElement } from "@packages/utilities/lib/parser"

enum QuestionType {
  TEXT="text",
  NUMBER="number",
  TEXTAREA="textarea",
  DATE_PICKER="date",
  BOOLEAN="toggle",
  DROPDOWN="select",
  FILE="attachment",
}

export interface IQuestion {
  id: string
  label: string
  type: `${QuestionType}`
  configuration?: {
    required?: boolean
    options?: {
      label: string
      key: string
    }[]
    default_value?: string
    help_text?: string
    placeholder?: string
    file_types?: string[]
    max_file_size?: number
    multiple?: boolean
    autocomplete?: boolean
  }
}

export const parseQuestionsMeta = (questions: IQuestion[], fieldNamePrefix=""): IField[] => {
  return questions.map(i => {
    const inputType = Object.keys(QuestionType)[Object.values(QuestionType).indexOf(i.type as QuestionType)] as IFieldType
    return {
      label: parseReactElement(i.label),
      fieldName: `${fieldNamePrefix}${i.id}`,
      inputType,
      rules: [
        ...i.configuration?.required ? [{ required: true, message: "This field is required!" }] : [],
      ],
      options: i.configuration?.options?.map(i => ({label: i.label, value: i.key})),
      initialValue: i.configuration?.default_value,
      helperText: i.configuration?.help_text,
      placeholder: i.configuration?.placeholder,
      accept: i.configuration?.file_types?.join(","),
      multiple: i.configuration?.multiple,
      autoComplete: i.configuration?.autocomplete as any,
    }
  })
}