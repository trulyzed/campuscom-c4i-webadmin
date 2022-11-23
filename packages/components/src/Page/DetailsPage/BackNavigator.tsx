import { useHistory } from "react-router-dom"
import { IconButton } from "~/Form/Buttons/IconButton"

export const BackNavigator = () => {
  const history = useHistory()
  return <IconButton buttonType="default" iconType="back" toolTip="Go Back" onClick={history.goBack} />
}
