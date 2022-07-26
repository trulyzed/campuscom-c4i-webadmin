import { useEffect } from "react"
import { IQueryParams } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { IField, IGeneratedField } from "~/packages/components/Form/common"

interface IArgs extends IGeneratedField {
  loadOptions?: (params?: IQueryParams) => Promise<any[]>,
  setOptions?: React.Dispatch<React.SetStateAction<any[]>>,
  formLookupData?: Record<string, any>
}

export function useDependencyValue(args: IArgs) {
  const { fieldName, formInstance, dependencyValue, onDependencyChange, updateMeta, loadOptions, setOptions, formLookupData } = args
  useEffect(() => {
    if (formLookupData) return
    onDependencyChange?.(dependencyValue, {
      toggleField: (status) => updateMeta?.(prevVal => (prevVal.reduce((a, c) => {
        if (c.fieldName === fieldName) c.hidden = !status
        a.push(c)
        return a
      }, [] as IField[])
      )),
      loadOptions: loadOptions ? async (args, reset): Promise<any[]> => {
        formInstance.setFieldsValue({ [fieldName]: undefined })
        if (!reset) {
          Object.keys(dependencyValue || {}).find(key => dependencyValue[key] !== undefined) ?
            await loadOptions(args)
            : setOptions?.([])
        }
        return []
      } : undefined,
    })
    // eslint-disable-next-line
  }, [fieldName, dependencyValue, onDependencyChange, loadOptions, formLookupData])

  useEffect(() => {
    console.log(formLookupData, dependencyValue)
    onDependencyChange?.(dependencyValue, {
      toggleField: (status) => updateMeta?.(prevVal => (prevVal.reduce((a, c) => {
        if (c.fieldName === fieldName) c.hidden = !status
        a.push(c)
        return a
      }, [] as IField[])
      )),
      formLookupData
    })
    // eslint-disable-next-line
  }, [fieldName, dependencyValue, onDependencyChange, formLookupData])

  return null
}
