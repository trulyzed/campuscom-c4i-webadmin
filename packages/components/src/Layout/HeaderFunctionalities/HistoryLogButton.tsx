import React, { useEffect, useState } from "react"
import { Button, Card, Col, List, Row, Typography } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { lastVisitedProcessor, ILastVisited, UPDATE_HISTORY } from "~/HistoryProcessor"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { Modal } from "~/Modal/Modal"
import { ContextAction } from "~/Actions/ContextAction"


const History = (props: {
  Urls: ILastVisited[]
  nonDesktop: boolean
  showModal: boolean
  setShowModal: (flag: boolean) => void
}) => {
  return (
    <>
      <div
        {...(props.nonDesktop && { style: { maxHeight: "50vh", overflowY: "scroll" } })}
        {...(!props.nonDesktop && {
          style: {
            position: "absolute",
            right: "0px",
            zIndex: 100,
            backgroundColor: "white",
            width: props.nonDesktop ? "350px" : "500px",
            maxHeight: "50vh",
            overflowY: "auto",
            borderBottom: "1px solid lightgray"
          }
        })}
      >
        <List
          size="large"
          header={<Typography.Title level={4}>Last Visited</Typography.Title>}
          bordered
          dataSource={props.Urls}
          renderItem={(x) => (
            <List.Item>
              <Row style={{ width: "100%" }}>
                <Col flex="auto">
                  {x.name ? (
                    <div>
                      {x.pageName}{" "}
                      <Link to={x.url} onClick={() => props.setShowModal(false)}>
                        {x.name}
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link to={x.url} onClick={() => props.setShowModal(false)}>
                        {x.url}
                      </Link>{" "}
                      Page
                    </div>
                  )}
                </Col>
                <Col flex="none">
                  <div style={{ color: "gray", fontSize: "13px" }}>{moment(x.timestamp).fromNow()}</div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}

export const HistoryLogButton = () => {
  const [showModal, setShowModal] = useState(false)

  const [Urls, setUrls] = useState<ILastVisited[]>([])
  useEffect(() => {
    setUrls(lastVisitedProcessor.getHistory())
    eventBus.subscribe(UPDATE_HISTORY, (removeHistory?: boolean) => {
      if (removeHistory) setUrls(lastVisitedProcessor.removeHistory())
      else setUrls(lastVisitedProcessor.getUpdatedHistory())
    })
    return () => {
      eventBus.unsubscribe(UPDATE_HISTORY)
    }
  }, [])

  const [nonDesktop, setNonDesktop] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setNonDesktop(deviceViews.mobile || deviceViews.tab)
  })

  return (
    !nonDesktop ? (
      <div onMouseEnter={() => setShowModal(true)} onMouseLeave={() => setShowModal(false)}>
        <ContextAction
          type="showHistory"
          tooltip="Last Visited Pages"
          onClick={() => setShowModal(true)}
        />
        {showModal && (
          <History Urls={Urls} nonDesktop={nonDesktop} showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>
    ) : (
      <>
        <ContextAction
          type="showHistory"
          tooltip="Last Visited Pages"
          onClick={() => setShowModal(true)}
        />
        {showModal && (
          <Modal width="1000px">
            <Card actions={[<Button onClick={() => setShowModal(false)}>Close</Button>]}>
              <History Urls={Urls} nonDesktop={nonDesktop} showModal={showModal} setShowModal={setShowModal} />
            </Card>
          </Modal>
        )}
      </>
    )
  )
}
