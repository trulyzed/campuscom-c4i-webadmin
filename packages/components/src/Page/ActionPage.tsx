import { Col, Row } from "antd"
import React from "react"
import { HelpButton } from "~/Help/HelpButton"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"

export const ActionPage = (props: {
  title?: string
  blocks?: React.ReactNode[]
  helpKey?: string
  children: React.ReactNode
}) => {
  return (
    <div className="site-layout-content">
      <Row justify="space-between">
        {props.title && (
          <Col flex="none">
            <SidebarMenuTargetHeading level={1} targetID="navigation">
              {props.title}
            </SidebarMenuTargetHeading>
          </Col>
        )}
        {
          <Col flex="none">
            <Row>
              {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
              {props.helpKey && <HelpButton helpKey={props.helpKey} />}
            </Row>
          </Col>
        }
      </Row>
      {props.children}
    </div>
  )
}
