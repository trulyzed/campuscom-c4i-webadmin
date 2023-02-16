import { IField, TEXT } from "@packages/components/lib/Form/common"

export const SkillSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Skill Type",
    inputType: TEXT,
    fieldName: "skill_type__icontains",
  },
]
