import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getUser, setUser } from "@packages/services/lib/Api/utils/TokenStore"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { useEffect, useMemo, useState } from "react"
import { REFRESH_USER_PREFERENCE } from "~/Constants"
import { UserPreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserPreferences"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { MetaDrivenFormModalOpenButton } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"

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
  const [userPreferences, setUserPreferences] = useState<IUser["preferences"]>(getUser()?.preferences || {})
  const initialFormValue = useMemo(() => Object.keys(userPreferences).reduce((a, c) => {
    if (typeof userPreferences[c] === "object") a[c] = userPreferences[c]["id"]
    return a
  }, {} as Record<string, any>), [userPreferences])

  useEffect(() => {
    const name = `${REFRESH_USER_PREFERENCE}_SWITCHER`
    eventBus.subscribe(name, setUserPreferences)
    return () => eventBus.unsubscribe(name)
  }, [])

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
        if (resp.success) {
          setUser({
            ...getUser()!,
            preferences: payload
          })
          eventBus.publishSimilarEvents(/REFRESH_USER_PREFERENCE.*/i, payload)
        }
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