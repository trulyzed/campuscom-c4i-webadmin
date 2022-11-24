import { useHistory } from "react-router-dom"
import { ContextAction } from "~/Actions/ContextAction"

export const BackNavigator = () => {
  const history = useHistory()
  return <ContextAction tooltip="Go Back" type="previous" buttonType="ghost" iconColor="primary" onClick={history.goBack} />
}
