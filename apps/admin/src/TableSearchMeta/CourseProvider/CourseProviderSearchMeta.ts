import { IField, TEXT } from "@packages/components/lib/Form/common"

export const CourseProviderSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Code",
    inputType: TEXT,
    fieldName: "code",
  }
]
