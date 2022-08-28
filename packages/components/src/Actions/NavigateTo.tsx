import { ReactNode } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"

interface INavigateToProps {
  name: string
  path: string
  className?: string
  type?: "create"
  icon?: ReactNode
}

export const NavigateTo = ({ name, path, type, icon, className }: INavigateToProps) => {
  return (
    <Link to={path}>
      <Button icon={type === "create" ? <span className="glyphicon glyphicon-plus-sign" /> : icon} type="primary" className={`${type === "create" ? "create-entity" : ''} ${className}`}>
        <span className="ml-5">{name}</span>
      </Button>
    </Link>
  )
}