import React, { useState } from "react"
import { Card, Col, Row } from "antd"
import { CardContainer, CardContents, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDeviceView, useDeviceViews } from "~/packages/components/Hooks/useDeviceViews"

const DetailsCardContainer = (props: { card: CardContainer }) => {
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })
  return (
    <Card
      title={props.card.title}
      extra={
        props.card.cardActions ? (
          <Row>
            {props.card.cardActions.map((action, i) => (
              <Col key={i}>{action}</Col>
            ))}
          </Row>
        ) : undefined
      }
    >
      <table className="dorakata-table" role="presentation">
        <tbody>
          {Array.isArray(props.card.contents) && props.card.contents.length > 0 ? (
            props.card.contents.map((y: CardContents, j: number) =>
              mobileView ? (
                <tr>
                  <td>
                    {y.label !== "" && <div> {y.label}: </div>}
                    <div>{y.jsx ? y.jsx : y.render ? y.render(y.value) : y.value}</div>
                  </td>
                </tr>
              ) : (
                <tr key={j} className={y.cssClass}>
                  {y.label !== "" && (
                    <>
                      <td>{y.label}</td>
                      <td style={{ width: "30px" }}></td>
                    </>
                  )}
                  <td>{y.jsx ? y.jsx : y.render ? y.render(y.value) : y.value}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td style={{ color: "red" }}>No data available!</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  )
}

export const DetailsSummary = (props: IDetailsSummary) => {
  return (
    <>
      {Array.isArray(props.actions) && (
        <Row justify="end">
          {props.actions.map((x, key) => (
            <Col key={key} style={{ marginLeft: "10px", marginBottom: "10px" }}>
              {x}
            </Col>
          ))}
        </Row>
      )}
      <Row>
        {props.summary.length > 0 &&
          props.summary.map((x: CardContainer, i) => (
            <Col key={i} xs={24} sm={24} md={12}>
              {Array.isArray(x.contents) ? (
                <DetailsCardContainer card={x} />
              ) : Array.isArray(x.groupedContents) ? (
                x.groupedContents.map((y: CardContainer, j: number) => (
                  <DetailsCardContainer key={`${i}${j * 100}`} card={y} />
                ))
              ) : null}
            </Col>
          ))}
      </Row>
    </>
  )
}
