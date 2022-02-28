import React, { useState } from "react"
import { Button, Col, Dropdown, Menu } from "antd"
// import { NewOrderButton } from "~/Component/Layout/HeaderFunctionalities/NewOrderButton"
// import { HistoryLogButton } from "~/Component/Layout/HeaderFunctionalities/HistoryLogButton"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { DownOutlined } from "@ant-design/icons"
import { GoToUserProfileButton } from "~/Component/Layout/HeaderFunctionalities/GoToUserProfileButton"

export const HeaderFunctionalities = () => {
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const menu = (
    <Menu>
      {/* <Menu.Item key="1" role="navigation">
        <NewOrderButton />
      </Menu.Item>
      <Menu.Item key="2" role="navigation">
        <HistoryLogButton />
      </Menu.Item> */}
      <Menu.Item key="3" role="navigation">
        <GoToUserProfileButton />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {!mobileView && (
        <>
          {/* <Col flex="50px" role="navigation" aria-label="Create New Order">
            <NewOrderButton />
          </Col>
          <Col flex="50px" role="navigation" aria-label="History Log">
            <HistoryLogButton />
          </Col> */}
          <Col flex="50px" role="navigation" aria-label="Go to User Profile">
            <GoToUserProfileButton />
          </Col>
        </>
      )}
      {mobileView && (
        <Dropdown getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement} overlay={menu} trigger={["click"]}>
          <Button style={{ margin: "10px" }} type="link" shape="circle" icon={<DownOutlined />} />
        </Dropdown>
      )}
    </>
  )
}
