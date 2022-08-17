import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"

export const QuestionSearchMeta: IField[] = [
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains"
  },
  {
    label: "Type",
    inputType: DROPDOWN,
    fieldName: "question_type",
    options: INPUT_OPTIONS.QUESTION_TYPE
  },
]
