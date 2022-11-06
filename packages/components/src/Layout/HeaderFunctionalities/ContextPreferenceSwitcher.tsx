import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { useContext, useMemo } from "react"
import { UserPreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserPreferences"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { MetaDrivenFormModalOpenButton } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { UserDataContext } from "~/Context/UserDataContext"

interface IContextPreferenceSwitcherProps {
  label: string
  formMeta: any
  formTitle: string
  preferenceIndex: string
  contextDetailsQuery: IQuery
}

export const ContextPreferenceSwitcher = ({
  label,
  formMeta,
  formTitle,
  preferenceIndex,
  contextDetailsQuery,
}: IContextPreferenceSwitcherProps) => {
  const { userPreferences, setUserPreferences } = useContext(UserDataContext)
  const initialFormValue = useMemo(() => Object.keys(userPreferences).reduce((a, c) => {
    if (typeof userPreferences[c] === "object") a[c] = userPreferences[c]["id"]
    return a
  }, {} as Record<string, any>), [userPreferences])

  const handleSubmit = QueryConstructor(async (params) => {
    const resp = await contextDetailsQuery({ params: { id: params?.data[preferenceIndex] } })
    const payload = {
      [preferenceIndex]: {
        id: resp.data.id,
        name: resp.data.name,
      }
    }
    if (resp.success) {
      return UserPreferenceQueries.save({
        ...params,
        data: payload
      }).then(resp => {
        if (resp.success) setUserPreferences(payload)
        return resp
      })
    } else return resp
  }, [contextDetailsQuery, UserPreferenceQueries.save])

  return (
    <MetaDrivenFormModalOpenButton
      buttonLabel={label}
      formTitle={formTitle}
      formMeta={formMeta}
      iconType={"shuffle"}
      formSubmitApi={handleSubmit}
      initialFormValue={initialFormValue}
    />
  )
}