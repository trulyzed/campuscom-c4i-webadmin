import { forwardRef } from "react"
import { useHistory } from "react-router-dom"
import { ContextAction } from "~/Actions/ContextAction"

export const BackNavigator = forwardRef<HTMLElement>((_, ref) => {
  const history = useHistory()
  return <ContextAction ref={ref} tooltip="Go Back" type="previous" buttonType="ghost" iconColor="primary" onClick={history.goBack} />
})
