import React from "react"
import { Button, Dropdown, Menu } from "antd"
import { Link } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"
import SubMenu from "antd/lib/menu/SubMenu"

interface IGoToMenu {
  menuList: IMenu[]
}

export interface IMenu {
  title: string
  url: string
  items?: IMenu[]
}

export function GoToMenu(props: IGoToMenu) {
  return (
    <Dropdown
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      trigger={["click"]}
      overlay={
        <Menu>
          {props.menuList.map((x, i) => {
            if (x.items && x.items?.length > 0) {
              return (
                <SubMenu key={i} title={x.title}>
                  {x.items.map((y, j) => (
                    <Menu.Item key={j + " " + i}>
                      <Link to={y.url}>{y.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={i}>
                  <Link to={x.url}>{x.title}</Link>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      }
    >
      <Button type="primary" onClick={(e) => e.preventDefault()}>
        Go To <DownOutlined />
      </Button>
    </Dropdown>
  )
}
