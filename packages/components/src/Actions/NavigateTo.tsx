import { ReactNode } from "react"
import { Button, ButtonProps } from "antd"
import { Link } from "react-router-dom"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"

interface INavigateToProps {
  name: string
  path: string
  className?: string
  type?: "create" | "add"
  icon?: ReactNode
  iconOnly?: boolean
  buttonType?: ButtonProps["type"]
  apiPermission: IQuery
}

export const NavigateTo = ({ name, path, type, icon, iconOnly, className, apiPermission, buttonType = "primary" }: INavigateToProps) => {
  return checkAdminApiPermission(apiPermission) ? (
    <Link to={path}>
      <Button
        className={`${type === "create" ? "create-entity" : ''}${className ? ` ${className}` : ""}`}
        title={name}
        icon={(type === "create" || type === "add") ? <span className="glyphicon glyphicon-plus-sign" /> : icon}
        type={iconOnly ? "link" : buttonType}
      >
        {iconOnly ? undefined : <span className="ml-5">{name}</span>}
      </Button>
    </Link>
  ) : null
}