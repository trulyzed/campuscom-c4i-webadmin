import React, { Suspense, useEffect, useState } from "react"
import { Col, Layout, Row, Spin } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Sidebar } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { useSidebarCollapsed } from "~/Hooks/useSidebarCollapsed"
import { Link } from "react-router-dom"
import { HeaderFunctionalities } from "~/Component/Layout/HeaderFunctionalities/HeaderFunctionalities"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { getAboutInfoFromStorage } from "@packages/api/lib/utils/TokenStore"
import { Breadcrumb } from "~/Layout/Breadcrumb"
import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"
import { logout } from "~/Services/AuthService"

const { Header, Content, Footer } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()

  const [schoolName, setSchoolName] = useState<string | null | undefined>()
  const [version, setVersion] = useState<string | null | undefined>()

  useEffect(() => {
    eventBus.subscribe("REFRESH_SCHOOL_INFO", () => {
      const info = getAboutInfoFromStorage()
      setSchoolName(info.schoolName)
      setVersion(info.version)
    })
    setTimeout(() => {
      eventBus.publish("REFRESH_SCHOOL_INFO")
    }, 0)
    return () => eventBus.unsubscribe("REFRESH_SCHOOL_INFO")
  }, [])
  return (
    <Layout>
      <Sidebar collapsed={collapsed} logout={logout} getSidebarMenus={getSidebarMenus} />
      <Layout className="site-layout">
        <Header role="none" className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col flex="50px" role="navigation" aria-label="Sidebar Toggle">
              <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </Col>
            <Col flex="auto" role="navigation" aria-label="Go to home page">
              <h1 aria-label="School Name" style={{ marginTop: "-7px" }}>
                <Link
                  style={{
                    color: "white",
                    fontSize: "25px",
                    marginTop: "-7px",
                    textAlign: "start",
                    marginLeft: "20px"
                  }}
                  to="/"
                >
                  {schoolName}
                </Link>
              </h1>
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
        <Footer role="contentinfo" style={{ textAlign: "center" }}>
          <span>buildVersion: {version}</span>
          <span>Jenzabar ©{new Date().getFullYear()} Created by Jenzabar Team</span>
        </Footer>
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
