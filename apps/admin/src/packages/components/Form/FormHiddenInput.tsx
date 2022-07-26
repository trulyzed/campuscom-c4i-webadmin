import React, { useEffect } from "react"
import { IField, IGeneratedField } from "~/packages/components/Form/common"

export function FormHiddenInput(props: IGeneratedField & {
  dependencyValue?: any
  updateMeta?: React.Dispatch<React.SetStateAction<IField[]>>
  formLookupData?: Record<string, any>
}) {
  const { onDependencyChange, updateMeta, fieldName, dependencyValue, formLookupData } = props
  console.log(props)
  useEffect(() => {
    onDependencyChange?.(dependencyValue, {
      toggleField: (status) => updateMeta?.(prevVal => (prevVal.reduce((a, c) => {
        if (c.fieldName === fieldName) c.hidden = !status
        a.push(c)
        return a
      }, [] as IField[])
      )),
      formLookupData
    })
  }, [dependencyValue, onDependencyChange, fieldName, updateMeta, formLookupData])

  return (
    null
  )
}
