import { ReactNode } from "react"
import { Button } from "antd"
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
  apiPermission: IQuery
}

export const NavigateTo = ({ name, path, type, icon, iconOnly, className, apiPermission }: INavigateToProps) => {
  return checkAdminApiPermission(apiPermission) ? (
    <Link to={path}>
      <Button title={name} icon={(type === "create" || type === "add") ? <span className="glyphicon glyphicon-plus-sign" /> : icon} type={iconOnly ? "link" : "primary"} className={`${type === "create" ? "create-entity" : ''}${className ? ` ${className}` : ""}`}>
        {iconOnly ? undefined : <span className="ml-5">{name}</span>}
      </Button>
    </Link>
  ) : null
}