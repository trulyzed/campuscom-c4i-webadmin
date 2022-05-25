import React from "react"
import { Card, Col, Row, Tag } from "antd";

interface IDetailsGroupedListProp {
  data: { [key: string]: any }[],
  groupKey: string,
  displayKey: string,
}

export default function GroupedList(props: IDetailsGroupedListProp) {
  const {
    groupKey,
    data,
    displayKey
  } = props

  const processedData = data.reduce((a: { [key: string]: any }[], c) => {
    const matchedIndex = a.findIndex(i => i.groupName === c[groupKey])
    const dataItem = c
    if (matchedIndex > -1) a[matchedIndex].data.push(dataItem);
    else {
      a.push({
        groupName: c[groupKey],
        data: [dataItem]
      })
    }
    return a;
  }, [])

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={24}>
          {
            processedData.map((group: { [key: string]: any }) => (
              <Card key={group.groupName} title={group.groupName} size={'small'} style={{ marginBottom: 4 }}>
                {
                  group.data.map((dataItem: { [key: string]: any }, index: number) => <Tag key={index}>{dataItem[displayKey]}</Tag>)
                }
              </Card>
            ))
          }
        </Col>
      </Row>
    </div>
  )
}
