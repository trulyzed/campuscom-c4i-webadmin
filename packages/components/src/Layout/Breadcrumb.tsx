import React, { useCallback, useEffect, useState } from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link, RouteProps, useLocation } from "react-router-dom"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { transformToLabel } from "@packages/utilities/lib/util"
import { SET_LAST_BREADCRUMB } from "@packages/utilities/lib/Constants"

export const REFRESH_BREADCRUMB = "REFRESH_BREADCRUMB"

interface IBreadcrumbPath {
  label: string | number
  path?: string
}

interface IBreadcrumbProps {
  routes: RouteProps[]
}

export interface IBreadcrumbHandle {
  setLastCrumb: (value: any) => void
}

export const Breadcrumb = ({ routes }: IBreadcrumbProps) => {
  const location = useLocation()
  const [breadcrumbPaths, setBreadcrumbPaths] = useState<Array<IBreadcrumbPath>>([])
  const [lastCrumb, setLastCrumb] = useState<string>()

  useEffect(() => {
    eventBus.subscribe(SET_LAST_BREADCRUMB, (val) => {
      setLastCrumb(val)
    })

    return () => {
      eventBus.unsubscribe(SET_LAST_BREADCRUMB)
    }
  }, [])

  const generateBreadcrumbPath = useCallback((path: string): IBreadcrumbPath[] => {
    const breadcrumbPaths: Array<IBreadcrumbPath> = [{ path: "/", label: "Home" }]
    if (path === "/") return breadcrumbPaths

    const routesFollowingHome = path.split("/").slice(1)
    routesFollowingHome.reduce((path, route) => {
      let convertedRoute: string | number = route
      if (!isNaN(Number(route))) {
        convertedRoute = Number(route)
      }
      if (path === breadcrumbPaths[0].path) {
        path += route
      } else {
        path = `${path}/${route}`
      }

      breadcrumbPaths.push({ path: routes.some(i => i.path === path) ? path : undefined, label: transformToLabel(convertedRoute) })
      return path
    }, breadcrumbPaths[0].path)

    return breadcrumbPaths
  }, [routes])

  const callNeccessaryApis = async () => {
    const tempBreadcrumbPaths = generateBreadcrumbPath(location.pathname)
    setBreadcrumbPaths(tempBreadcrumbPaths)
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_BREADCRUMB, callNeccessaryApis)
    eventBus.publish(REFRESH_BREADCRUMB)
    return () => eventBus.unsubscribe(REFRESH_BREADCRUMB)
    // eslint-disable-next-line
  }, [location.pathname])

  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }} separator={<span className="glyphicon glyphicon-triangle-right" />}>
      {breadcrumbPaths.map((item, i) => (
        <AntdBreadcrumb.Item key={i}>
          {((i === (breadcrumbPaths.length - 1)) && lastCrumb !== undefined) ? lastCrumb : (item.path && i !== (breadcrumbPaths.length - 1)) ? <Link to={item.path}>{item.label}</Link> : item.label}
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  )
}
