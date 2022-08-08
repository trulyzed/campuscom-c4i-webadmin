import { Button, Dropdown, Menu, Space } from "antd"

interface IActionItem {
  title: React.ReactNode
  key: string
  onClick?: () => void
}

interface IDropdownActionsProp {
  title: React.ReactNode
  actions: IActionItem[]
}

export const DropdownActions = ({
  title,
  actions = []
}: IDropdownActionsProp) => {
  const menu = (
    <Menu>
      {actions.map(action => (
        <Menu.Item key={action.key} onClick={action.onClick}>
          {action.title}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <Space>
          {title}
          <span className="glyphicon glyphicon-down" />
        </Space>
      </Button>
    </Dropdown>
  )
}