import React, { Suspense } from "react"
import { Col, Layout, Row, Spin } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Sidebar } from "~/packages/components/SidebarNavigation/Sidebar"
import { useSidebarCollapsed } from "~/Hooks/useSidebarCollapsed"
import { HeaderFunctionalities } from "~/Component/Layout/HeaderFunctionalities/HeaderFunctionalities"
import { Breadcrumb } from "~/Layout/Breadcrumb"
import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"
import { logout } from "~/packages/services/AuthService"

const { Header, Content } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()

  return (
    <Layout>
      <Sidebar collapsed={collapsed} logout={logout} getSidebarMenus={getSidebarMenus} />
      <Layout className="site-layout">
        <Header role="none" className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col flex="50px" role="navigation" aria-label="Sidebar Toggle">
              <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </Col>
            <HeaderFunctionalities />
          </Row>
        </Header>
        <Content role="main" style={{ padding: "0 20px" }}>
          <Breadcrumb />
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
    <>
      {props.collapsed && <MenuUnfoldOutlined role="button" style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }} onClick={() => props.setCollapsed(!props.collapsed)} />}
      {!props.collapsed && <MenuFoldOutlined role="button" style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }} onClick={() => props.setCollapsed(!props.collapsed)} />}
    </>
  )
}
