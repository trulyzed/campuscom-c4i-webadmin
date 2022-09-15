import React, { Suspense, useState, useEffect } from "react"
import { Card, Col, Layout, Row, Spin, Grid } from "antd"
import { Link, useLocation } from "react-router-dom"
import { Sidebar, ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { useSidebarCollapsed } from "@packages/components/lib/Hooks/useSidebarCollapsed"
import { HeaderFunctionalities } from "~/Component/Layout/HeaderFunctionalities/HeaderFunctionalities"
import { Breadcrumb } from "@packages/components/lib/Layout/Breadcrumb"
import { logout } from "~/Services/AuthService"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { LOGGED_IN_SUCCESSFULLY } from "~/Constants"
import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"
import { AppRoutes } from "~/routes"

const { Header, Content } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const [sidebarMenus, setSidebarMenus] = useState<ISidebarMenu[]>(getSidebarMenus())
  const breakpoint = Grid.useBreakpoint()
  const { pathname } = useLocation()

  useEffect(() => {
    eventBus.subscribe(LOGGED_IN_SUCCESSFULLY, () => setSidebarMenus(getSidebarMenus()))
    return () => {
      eventBus.unsubscribe(LOGGED_IN_SUCCESSFULLY)
    }
  }, [])

  useEffect(() => {
    if (breakpoint.sm) return
    setCollapsed(true)
  }, [pathname, breakpoint.sm, setCollapsed])

  return (
    <Layout>
      <Sidebar collapsed={collapsed} logout={logout} sidebarMenus={sidebarMenus} onClose={() => setCollapsed(true)} />
      <Layout className="site-layout" style={collapsed ? undefined : { overflow: "hidden", }}>
        <Header role="none" className="site-layout-background" style={{ width: breakpoint.sm ? undefined : "100vw" }}>
          <Row style={{ height: "100%" }}>
            <Col style={{ height: "100%" }} className="sidebar-toggle flex-center" flex="50px" role="navigation" aria-label="Sidebar Toggle">
              <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </Col>
            <Col className="site-header__item" style={{ height: "100%", display: "flex", alignItems: "center" }} flex={"1"} role="navigation" aria-label="Go to home page">
              <Link
                id="main-title"
                to="/"
                className="logo"
              >
                <h2 style={{
                  height: "100%",
                  fontSize: breakpoint.md ? "24px" : breakpoint.xs ? "18px" : "24px",
                  lineHeight: "24px",
                  marginLeft: breakpoint.md ? "20px" : breakpoint.sm ? "15px" : breakpoint.xs ? "10px" : "20px",
                  marginBottom: 0
                }} aria-label="School Name" className="site-title">
                  Campus Marketplace Webadmin
                </h2>
              </Link>
            </Col>
            <HeaderFunctionalities />
          </Row>
        </Header>
        <Content role="main" style={{ padding: "0 20px", width: breakpoint.sm ? undefined : "100vw" }}>
          <Suspense
            fallback={
              <Spin
                style={{
                  margin: 0,
                  position: "relative",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
                size="large"
              />
            }
          >
            <Card className="mxn-20" bodyStyle={{ padding: '0 10px' }}>
              <Breadcrumb routes={AppRoutes} />
            </Card>
            {props.children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

interface IMenuToggle {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function MenuToggle(props: IMenuToggle) {
  return (
    <span
      style={{ fontSize: '25px', flex: 1, textAlign: 'center' }}
      tabIndex={0}
      role={"button"}
      className="glyphicon glyphicon-th-large cursor-pointer"
      onClick={() => props.setCollapsed(!props.collapsed)}
      onKeyDown={() => props.setCollapsed(!props.collapsed)} />
  )
}
