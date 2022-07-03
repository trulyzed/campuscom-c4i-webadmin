import React, { useEffect, useState } from "react"
import { Layout } from "antd"
import { Link } from "react-router-dom"
import { eventBus } from "~/packages/utils/EventBus"
import { UpOutlined, DownOutlined } from "@ant-design/icons"
import { ISidebarMenu } from "~/Component/Layout/SidebarMenus"

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
          <span>{props.title}</span>
          <span>
            {expanded ? (
              <UpOutlined style={{ fontSize: "0.7rem" }} />
            ) : (
              <DownOutlined style={{ fontSize: "0.7rem" }} />
            )}
          </span>
        </button>
      )}
      {expanded && (
        <ul style={{ ...ulStyle, paddingLeft: `${props.padding}px` }}>
          {props._sidebarMenus.filter(i => i.permission).map(x => {
            if (x.submenu && x.submenu.length > 0)
              return (
                <li key={x.key}>
                  <RenderMenu title={x.title} _sidebarMenus={x.submenu} padding={props.padding + 20} />
                </li>
              )
            else
              return (
                <li key={x.key} style={liStyle}>
                  <Link
                    id={x.url.split("/").join("-")}
                    to={`${x.url}#main${x.url.split("/").join("-")}`}
                    className={'submenu'}
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
export function Sidebar(props: { collapsed: boolean; sidebarMenus: ISidebarMenu[]; logout: () => void }) {
  const [sidebarMenus, setSidebarMenus] = useState<ISidebarMenu[]>([])

  useEffect(() => {
    eventBus.subscribe("REFRESH_SIDEBAR", () =>
      setTimeout(() => {
        setSidebarMenus(props.sidebarMenus)
      }, 0)
    )
    eventBus.publish("REFRESH_SIDEBAR")
    return () => {
      eventBus.unsubscribe("REFRESH_SIDEBAR")
    }
    // eslint-disable-next-line
  }, [props.sidebarMenus])

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
      className={`sidebar${props.collapsed ? " sidebar--borderless" : ""}`}
    >
      <div style={{ overflowY: "auto", height: "100vh", padding: "10px 15px" }}>
        <RenderMenu _sidebarMenus={sidebarMenus} defaultExpanded padding={0} />
        <button style={buttonStyle} onClick={props.logout}>
          <span>Logout</span>
        </button>
      </div>
    </Layout.Sider>
  )
}
