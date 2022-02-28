import { Grid } from "antd"
import { useEffect } from "react"

export interface IDeviceView {
  mobile: boolean
  tab: boolean
  desktop: boolean
}

export function useDeviceViews(callBack: (deviceViews: IDeviceView) => void) {
  const { useBreakpoint } = Grid
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

    callBack({ mobile, tab, desktop })
  }, [screens, callBack])
}
