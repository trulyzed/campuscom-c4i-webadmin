import { Grid } from "antd"
import { useEffect, useState } from "react"

export interface IDeviceView {
  mobile: boolean
  tab: boolean
  desktop: boolean
}

export function useSidebarCollapsed(): Array<any> {
  const { useBreakpoint } = Grid
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const screens = useBreakpoint() as { [key: string]: boolean }
  useEffect(() => {
    let mobile = false
    let tab = false
    let desktop = false
    mobile = screens.xs
    if (!mobile) {
      tab = (screens.sm || screens.md) && !screens.lg
      if (!tab) {
        desktop = true
      }
    }

    if (mobile || tab) {
      setCollapsed(mobile || tab)
    } else if (desktop) {
      setCollapsed(!desktop)
    }
  }, [screens])
  return [collapsed, setCollapsed]
}
