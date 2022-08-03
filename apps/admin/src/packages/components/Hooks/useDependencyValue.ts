import { useEffect, useMemo } from "react"
import { IQueryParams } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { IField, IGeneratedField } from "~/packages/components/Form/common"

interface IArgs extends IGeneratedField {
  loadOptions?: (params?: IQueryParams) => Promise<any[]>,
  setOptions?: React.Dispatch<React.SetStateAction<any[]>>,
}

export function useDependencyValue(args: IArgs) {
  const { fieldName, formInstance, dependencyValue, onDependencyChange, updateMeta, loadOptions, setOptions } = args
  const memoizedDependencyValue = useMemo(() => dependencyValue, [dependencyValue])

  useEffect(() => {
    console.log(fieldName, memoizedDependencyValue)
    onDependencyChange?.(memoizedDependencyValue, {
      toggleField: (status) => updateMeta?.(prevVal => (prevVal.reduce((a, c) => {
        if (c.fieldName === fieldName) c.hidden = !status
        a.push(c)
        return a
      }, [] as IField[])
      )),
      loadOptions: loadOptions ? async (args, reset): Promise<any[]> => {
        formInstance.setFieldsValue({ [fieldName]: undefined })
        if (!reset) {
          Object.keys(memoizedDependencyValue || {}).find(key => memoizedDependencyValue[key] !== undefined) ?
            await loadOptions(args)
            : setOptions?.([])
        }
        return []
      } : undefined,
    })
    // eslint-disable-next-line
  }, [fieldName, memoizedDependencyValue, onDependencyChange, loadOptions])

  return null
}
