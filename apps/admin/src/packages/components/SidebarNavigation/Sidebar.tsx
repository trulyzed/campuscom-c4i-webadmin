import React, { useEffect, useState } from "react"
import { Layout } from "antd"
import { Link } from "react-router-dom"
import { eventBus } from "~/packages/utils/EventBus"
import { UpOutlined, DownOutlined } from "@ant-design/icons"

const ulStyle = { listStyle: "none", paddingLeft: "0px" }
const liStyle = { color: "white", width: "170px", padding: "10px" }
const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: "#000000",
  backgroundColor: "transparent",
  border: "1px"
}

export interface ISidebarMenu {
  title: string
  url: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

const RenderMenu = (props: {
  title?: string
  _sidebarMenus: ISidebarMenu[]
  defaultExpanded?: boolean
  padding: number
}) => {
  const [expanded, setExpanded] = useState(props.defaultExpanded)

  return (
    <>
      {props.title && (
        <button onClick={() => setExpanded(!expanded)} style={buttonStyle}>
          <span style={{ color: "white" }}>{props.title}</span>
          <span>
            {expanded ? (
              <UpOutlined style={{ color: "#ffffff", fontSize: "0.7rem" }} />
            ) : (
              <DownOutlined style={{ color: "#ffffff", fontSize: "0.7rem" }} />
            )}
          </span>
        </button>
      )}
      {expanded && (
        <ul style={{ ...ulStyle, paddingLeft: `${props.padding}px` }}>
          {props._sidebarMenus.map((x, i) => {
            if (!x.permission && x.permission !== undefined) return <></>
            if (x.submenu && x.submenu.length > 0)
              return (
                <li key={i}>
                  <RenderMenu title={x.title} _sidebarMenus={x.submenu} padding={props.padding + 20} />
                </li>
              )
            else
              return (
                <li key={i} style={liStyle}>
                  <Link
                    id={x.url.split("/").join("-")}
                    to={`${x.url}#main${x.url.split("/").join("-")}`}
                    style={{ color: "#ffffff" }}
                  >
                    {x.title}
                  </Link>
                </li>
              )
          })}
        </ul>
      )}
    </>
  )
}
export function Sidebar(props: { collapsed: boolean; getSidebarMenus: () => ISidebarMenu[]; logout: () => void }) {
  const [sidebarMenus, setSidebarMenus] = useState<ISidebarMenu[]>([])

  useEffect(() => {
    eventBus.subscribe("REFRESH_SIDEBAR", () =>
      setTimeout(() => {
        setSidebarMenus(props.getSidebarMenus())
      }, 0)
    )
    eventBus.publish("REFRESH_SIDEBAR")
    return () => {
      eventBus.unsubscribe("REFRESH_SIDEBAR")
    }
    // eslint-disable-next-line
  }, [props.getSidebarMenus])

  return (
    <Layout.Sider
      role="complementary"
      aria-roledescription="sidebar navigation"
      width={270}
      breakpoint="xs"
      collapsedWidth={0}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div style={{ overflow: "scroll", height: "100vh" }}>
        <RenderMenu _sidebarMenus={sidebarMenus} defaultExpanded padding={0} />
        <button style={buttonStyle} onClick={props.logout}>
          <span style={{ color: "white" }}>Logout</span>
        </button>
      </div>
    </Layout.Sider>
  )
}
