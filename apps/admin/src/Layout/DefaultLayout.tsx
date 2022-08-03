import React, { Suspense, useState, useEffect } from "react"
import { Card, Col, Layout, Row, Spin } from "antd"
import { Link } from "react-router-dom"
import { Sidebar } from "~/packages/components/SidebarNavigation/Sidebar"
import { useSidebarCollapsed } from "~/packages/components/Hooks/useSidebarCollapsed"
import { HeaderFunctionalities } from "~/Component/Layout/HeaderFunctionalities/HeaderFunctionalities"
import { Breadcrumb } from "~/Layout/Breadcrumb"
import { logout } from "~/packages/services/AuthService"
import { eventBus } from "~/packages/utils/EventBus"
import { LOGGED_IN_SUCCESSFULLY } from "~/Constants"
import { getSidebarMenus, ISidebarMenu } from "~/Component/Layout/SidebarMenus"

const { Header, Content } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const [sidebarMenus, setSidebarMenus] = useState<ISidebarMenu[]>(getSidebarMenus())

  useEffect(() => {
    eventBus.subscribe(LOGGED_IN_SUCCESSFULLY, () => setSidebarMenus(getSidebarMenus()))
    return () => {
      eventBus.unsubscribe(LOGGED_IN_SUCCESSFULLY)
    }
  }, [])

  return (
    <Layout>
      <Sidebar collapsed={collapsed} logout={logout} sidebarMenus={sidebarMenus} />
      <Layout className="site-layout">
        <Header role="none" className="site-layout-background">
          <Row style={{ height: "100%" }}>
            <Col style={{ height: "100%" }} className="sidebar-toggle flex-center" flex="50px" role="navigation" aria-label="Sidebar Toggle">
              <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </Col>
            <Col className="site-header__item" style={{ height: "100%", }} flex="auto" role="navigation" aria-label="Go to home page">
              <h2 aria-label="School Name" className="site-title">
                <Link
                  id="main-title"
                  style={{
                    fontSize: "24px",
                    marginLeft: "20px"
                  }}
                  to="/"
                  className="logo"
                >
                  C4I Webadmin
                </Link>
              </h2>
            </Col>
            <HeaderFunctionalities />
          </Row>
        </Header>
        <Content role="main" style={{ padding: "0 20px" }}>
          <Card className="mxn-20" bodyStyle={{ padding: '0 10px' }}>
            <Breadcrumb />
          </Card>
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
