import React from "react"
import { Avatar, Card } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import { IFaculty } from "@packages/api/lib/utils/Interfaces"

export const Intro = (props: { userInfo: IFaculty }) => {
  console.log("UserINfo:", props.userInfo)

  return (
    <Card title="Logged in as">
      <Card.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={props.userInfo.SortName}
        description={
          props.userInfo.Email ? (
            <>
              <MailOutlined />
              <span style={{ marginLeft: "10px" }}>{props.userInfo.Email}</span>
            </>
          ) : (
            ""
          )
        }
      />
    </Card>
  )
}
