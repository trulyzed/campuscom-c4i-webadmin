import { Button } from "antd"
import { createPortal } from "react-dom"

interface IFloatingActionProps {
  show: boolean
  onClick: () => void
}

export const FloatingAction = ({
  show,
  onClick
}: IFloatingActionProps) => {
  return show ? createPortal((
    <div style={{ position: "fixed", bottom: 'calc(50% - 20px)', right: 40, zIndex: 999 }}>
      <Button
        icon={<span
          style={{ fontSize: 35, display: 'block' }}
          className="glyphicon glyphicon-record glyphicon--danger zoom-in-out" />}
        type={"text"}
        title={"Recording"}
        onClick={onClick}
        style={{
          width: 55,
          height: 55,
          padding: 0,
        }}
      />
    </div>
  ), document.getElementById("root") as HTMLElement) : null
}