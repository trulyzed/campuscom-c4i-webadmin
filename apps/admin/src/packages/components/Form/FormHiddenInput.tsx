import React, { useEffect } from "react"
import { IField, IGeneratedField } from "~/packages/components/Form/common"

export function FormHiddenInput(props: IGeneratedField & {
  dependencyValue?: any
  updateMeta?: React.Dispatch<React.SetStateAction<IField[]>>
}) {
  const { onDependencyChange, updateMeta, fieldName, dependencyValue } = props
  useEffect(() => {
    onDependencyChange?.(dependencyValue, {
      toggleField: (status) => updateMeta?.(prevVal => (prevVal.reduce((a, c) => {
        if (c.fieldName === fieldName) c.hidden = !status
        a.push(c)
        return a
      }, [] as IField[])
      )),
    })
  }, [dependencyValue, onDependencyChange, fieldName, updateMeta])

  return (
    null
  )
}
