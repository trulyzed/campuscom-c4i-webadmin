import React, { useCallback, useState } from "react"
import { Card, Col, Descriptions, Row, Typography } from "antd"
import { CardContainer, CardContents, IDetailsSummary } from "~/Page/DetailsPage/DetailsPageInterfaces"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"

export const DetailsCardContainer = (props: { card: CardContainer, horizontal?: boolean }) => {
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })
  const EmptyState = (
    <tr>
      <td style={{ color: "red" }}>No data available!</td>
    </tr>
  )

  const renderValue = useCallback((y: CardContents) => {
    return y.jsx ? y.jsx : y.render ? y.render(y.value) : y.value
  }, [])

  return (
    <Card
      title={props.card.title}
      extra={
        props.card.cardActions ? (
          <Row className="action-container">
            {props.card.cardActions.map((action, i) => (
              <Col key={i}>{action}</Col>
            ))}
          </Row>
        ) : undefined
      }
      style={props.card.style}
    >
      {props.horizontal ?
        props.card.Component ?
          <props.card.Component inheritedProps={props.card} />
          : (Array.isArray(props.card.contents) && props.card.contents.length > 0 ?
            <Descriptions layout="vertical" colon={false} size="middle">
              {props.card.contents.map((y: CardContents, j: number) => (
                <Descriptions.Item key={j}
                  label={<Typography.Text strong children={y.label} style={y.emphasize ? { fontSize: "18px" } : undefined} />}>
                  {y.emphasize ? <Typography.Text strong children={renderValue(y)} style={y.emphasize ? { fontSize: "16px" } : undefined} /> : renderValue(y)}
                </Descriptions.Item>
              ))}
            </Descriptions>
            : EmptyState
          )
        : props.card.Component ?
          <props.card.Component inheritedProps={props.card} />
          : <table className="dorakata-table" role="presentation">
            <tbody>
              {Array.isArray(props.card.contents) && props.card.contents.length > 0 ? (
                props.card.contents.map((y: CardContents, j: number) =>
                  mobileView ? (
                    <tr key={j}>
                      <td>
                        {y.label !== "" && <div> {y.label}: </div>}
                        <div>{renderValue(y)}</div>
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
                      <td>{renderValue(y)}</td>
                    </tr>
                  )
                )
              ) : EmptyState}
            </tbody>
          </table>
      }
    </Card>
  )
}

export const DetailsSummary = (props: IDetailsSummary & { horizontal?: boolean }) => {
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
          props.summary.map((x, i) => (
            <Col key={i} xs={24} sm={24} md={x.colSpan || 12}>
              {x.Component ?
                <x.Component inheritedProps={x} />
                : Array.isArray(x.contents) ? (
                  <DetailsCardContainer horizontal={props.horizontal} card={x} />
                ) : Array.isArray(x.groupedContents) ? (
                  x.groupedContents.map((y: CardContainer, j: number) => (
                    <DetailsCardContainer horizontal={props.horizontal} key={`${i}${j * 100}`} card={y} />
                  ))
                ) : null}
            </Col>
          ))}
      </Row>
    </>
  )
}
