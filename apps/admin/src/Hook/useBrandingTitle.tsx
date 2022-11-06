import { useContext, useEffect, useMemo } from "react"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"

export const useBrandingTitle = () => {
  const { userData } = useContext(UserDataContext)
  const primaryCourseProvider = useMemo(() => {
    const defaultStoreId = userData?.preferences["default_store"]?.id
    const contextStores = Array.isArray(userData?.context) ? (userData?.context)?.find?.(i => i.type === "Store")?.values : []
    return contextStores?.find(j => j.id === defaultStoreId)?.primary_course_provider
  }, [userData])

  // Update document title
  useEffect(() => {
    document.title = `Campus Marketplace | ${primaryCourseProvider?.name || "Webadmin"}`

    return () => {
      document.title = "Campus Marketplace | Webadmin"
    }
  }, [primaryCourseProvider])


  return primaryCourseProvider?.name || "Campus Marketplace Webadmin"
}