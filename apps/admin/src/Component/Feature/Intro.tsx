import { Avatar, Card } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import { IUser } from "~/packages/services/Api/utils/Interfaces"

export const Intro = (props: { userInfo: IUser }) => {
  return (
    <Card title="Logged in as">
      <Card.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={props.userInfo.username}
        description={
          props.userInfo.email ? (
            <>
              <MailOutlined />
              <span style={{ marginLeft: "10px" }}>{props.userInfo.email}</span>
            </>
          ) : (
            ""
          )
        }
      />
    </Card>
  )
}
