import { ReactNode } from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"

interface INavigateToProps {
  name: string
  path: string
  className?: string
  type?: "create"
  icon?: ReactNode
  apiPermission: IQuery
}

export const NavigateTo = ({ name, path, type, icon, className, apiPermission }: INavigateToProps) => {
  return checkAdminApiPermission(apiPermission) ? (
    <Link to={path}>
      <Button icon={type === "create" ? <span className="glyphicon glyphicon-plus-sign" /> : icon} type="primary" className={`${type === "create" ? "create-entity" : ''} ${className}`}>
        <span className="ml-5">{name}</span>
      </Button>
    </Link>
  ) : null
}