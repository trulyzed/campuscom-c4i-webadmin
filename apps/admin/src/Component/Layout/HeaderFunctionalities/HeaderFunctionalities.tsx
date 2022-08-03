import React, { useState } from "react"
import { Button, Col, Dropdown, Menu } from "antd"
import { HistoryLogButton } from "~/Component/Layout/HeaderFunctionalities/HistoryLogButton"
import { MasterLookupComponent } from "~/Component/Layout/HeaderFunctionalities/MasterLookupComponent"
import { IDeviceView, useDeviceViews } from "~/packages/components/Hooks/useDeviceViews"
import { DownOutlined } from "@ant-design/icons"
import { GoToUserProfileButton } from "~/Component/Layout/HeaderFunctionalities/GoToUserProfileButton"

export const HeaderFunctionalities = () => {
  const [desktopView, setDesktopView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktopView(deviceViews.desktop)
  })

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <MasterLookupComponent />
      </Menu.Item>
      <Menu.Item key="1" role="navigation" aria-label="history log">
        <HistoryLogButton />
      </Menu.Item>
      <Menu.Item key="2" role="navigation" aria-label="go to user profile page">
        <GoToUserProfileButton />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {desktopView && (
        <>
          <Col className="site-header__item" style={{ height: "100%" }} flex="auto">
            <MasterLookupComponent />
          </Col>
          <Col className="site-header__item" style={{ height: "100%" }} flex="50px" role="navigation" aria-label="History Log">
            <HistoryLogButton />
          </Col>
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
