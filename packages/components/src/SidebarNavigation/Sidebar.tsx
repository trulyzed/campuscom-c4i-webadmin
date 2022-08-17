import React, { useEffect, useState } from "react"
import { Layout, Typography } from "antd"
import { Link } from "react-router-dom"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { ISidebarMenu } from "~/Layout/SidebarMenus"

const ulStyle = { listStyle: "none", paddingLeft: "0", paddingBottom: "25px", paddingTop: "10px" }
const liStyle = { color: "white", padding: "5px", paddingRight: "15px" }
const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 15px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: "#000000",
  backgroundColor: "transparent",
  border: "none",
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
          <Typography.Title level={4} style={{ fontSize: "18px", margin: 0 }} className={"no-white-space-wrap"}>{props.title}</Typography.Title>
          <span>
            {expanded ? (
              <span className="glyphicon glyphicon--primary glyphicon-chevron-up" />
            ) : (
              <span className="glyphicon glyphicon--primary glyphicon-chevron-down" />
            )}
          </span>
        </button>
      )}
      {expanded && (
        <ul style={{ ...ulStyle, paddingLeft: `${props.padding}px`, }}>
          {props._sidebarMenus.filter(i => i.permission).map(x => {
            if (x.submenu && x.submenu.length > 0)
              return (
                <li key={x.key} style={{ borderBottomWidth: "1px" }} className={"border-styles"}>
                  <RenderMenu title={x.title} _sidebarMenus={x.submenu} padding={props.padding + 40} />
                </li>
              )
            else
              return (
                <li key={x.key} style={liStyle}>
                  <Link
                    id={x.url.split("/").join("-")}
                    to={`${x.url}#main${x.url.split("/").join("-")}`}
                    className={'submenu'}
                    style={{ textDecoration: "none", }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", whiteSpace: "nowrap" }}>
                      {x.title}
                      <span className="glyphicon glyphicon-triangle-right glyphicon--primary" />
                    </div>
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
      <div style={{ overflowY: "auto", height: "100vh", }}>
        <div style={{ padding: "20px 14px", borderBottomWidth: "1px" }} className={"border-styles"}>
          <Typography.Title level={3} style={{ margin: 0 }} className={"no-white-space-wrap "}>Navigation</Typography.Title>
        </div>
        <div style={{ marginTop: "-10px" }}>
          <RenderMenu _sidebarMenus={sidebarMenus} defaultExpanded padding={0} />
        </div>
        <button style={buttonStyle} onClick={props.logout}>
          <Typography.Title level={4} style={{ fontSize: "18px", margin: 0 }}>Logout</Typography.Title>
        </button>
      </div>
    </Layout.Sider>
  )
}
