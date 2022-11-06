import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { getUser, setUser } from "@packages/services/lib/Api/utils/TokenStore"

interface IUserDataContextValue {
  userData: IUser | null
  userPreferences: IUser["preferences"]
  setUserData: (value: IUser) => void
  setUserPreferences: (value: IUser["preferences"]) => void
}

const initialValue = {
  userData: null,
  userPreferences: {},
  setUserData: () => undefined,
  setUserPreferences: () => undefined
} as IUserDataContextValue

export const UserDataContext = createContext(initialValue)

interface IUserDataProviderProps {
  children: ReactNode
}

export const UserDataProvider = ({
  children
}: IUserDataProviderProps) => {
  const [userData, setUserData] = useState(getUser())
  const userPreferences = useMemo(() => userData?.preferences || {}, [userData])

  const setUserPreferences = useCallback((value) => {
    setUserData((userData) => {
      const adjustedData = {
        ...userData,
        preferences: {
          ...userData?.preferences,
          ...value,
        }
      } as IUser
      setUser(adjustedData)
      return userData ? adjustedData : null
    })
  }, [])

  return (
    <UserDataContext.Provider value={{
      userData,
      userPreferences,
      setUserData,
      setUserPreferences
    }}>
      {children}
    </UserDataContext.Provider>
  )
}