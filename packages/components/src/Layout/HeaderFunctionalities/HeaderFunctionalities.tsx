import React, { ReactNode, useState } from "react"
import { RouteProps } from "react-router-dom"
import { Button, Col, Dropdown, Menu } from "antd"
import { HistoryLogButton } from "~/Layout/HeaderFunctionalities/HistoryLogButton"
import { MasterLookupComponent } from "~/Layout/HeaderFunctionalities/MasterLookupComponent"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { DownOutlined } from "@ant-design/icons"
import { GoToUserProfileButton } from "~/Layout/HeaderFunctionalities/GoToUserProfileButton"
import { IApiPermission } from "@packages/services/lib/Api/utils/Interfaces"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export interface IHeaderAction {
  ariaLabel: string
  component: ReactNode
  permission?: IQuery | IApiPermission[]
}

export const HeaderFunctionalities = (props: { actions?: IHeaderAction[], routes: RouteProps[] }) => {
  const [desktopView, setDesktopView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktopView(deviceViews.desktop)
  })

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <MasterLookupComponent routes={props.routes} />
      </Menu.Item>
      <Menu.Item key="1" role="navigation" aria-label="history log">
        <HistoryLogButton />
      </Menu.Item>
      {props.actions?.map((i, idx) => (!i.permission || checkAdminApiPermission(i.permission)) ? (
        <Menu.Item key={`${idx + 3}`} role="navigation" aria-label={i.ariaLabel}>
          {i.component}
        </Menu.Item>
      ) : null)}
      <Menu.Item key="2" role="navigation" aria-label="go to user profile page">
        <GoToUserProfileButton />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {desktopView && (
        <>
          <Col className="site-header__item" style={{ height: "100%" }}>
            <MasterLookupComponent routes={props.routes} />
          </Col>
          <Col className="site-header__item" style={{ height: "100%" }} flex="40px" role="navigation" aria-label="History Log">
            <HistoryLogButton />
          </Col>
          {props.actions?.map((i, idx) => (!i.permission || checkAdminApiPermission(i.permission)) ? (
            <Col key={idx} className="site-header__item" style={{ height: "100%" }} flex="40px" role="navigation" aria-label={i.ariaLabel}>
              {i.component}
            </Col>
          ) : null)}
          <Col className="site-header__item" style={{ height: "100%" }} flex="50px" role="navigation" aria-label="Go to User Profile page">
            <GoToUserProfileButton />
          </Col>
        </>
      )}
      {!desktopView && (
        <div className="site-header__item" style={{ height: "100%" }}>
          <Dropdown
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            overlay={menu}
            trigger={["click"]}
          >
            <Button
              style={{ margin: "10px" }}
              type="link"
              shape="circle"
              aria-label="Press enter and tab to open dropdown for Page Jump, New Order, History and Profile Shortcut"
              icon={<DownOutlined style={{ fontSize: "16px" }} />}
            />
          </Dropdown>
        </div>
      )}
    </>
  )
}
