import { useContext, useEffect } from "react"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { IPermissionContext } from "@packages/services/lib/Api/utils/Interfaces"
import { UserPreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserPreferences"

interface IUseSetDefaultPreferenceParams {
  contextType: IPermissionContext["type"]
  preferenceIndex: string
}

export const useSetDefaultPreference = ({
  contextType,
  preferenceIndex
}: IUseSetDefaultPreferenceParams) => {
  const { userData, setUserPreferences } = useContext(UserDataContext)

  useEffect(() => {
    if (userData?.preferences[preferenceIndex]) return
    const defaultContext = userData?.context?.find(i => i.type === contextType)?.values[0]
    if (!defaultContext) return
    const data = {
      [preferenceIndex]: {
        id: defaultContext.id,
        name: defaultContext.name,
      }
    }
    UserPreferenceQueries.save({ data }).then(resp => {
      if (resp.success) {
        setUserPreferences(data)
      }
    })

  }, [userData, contextType, preferenceIndex, setUserPreferences])

  return null
}