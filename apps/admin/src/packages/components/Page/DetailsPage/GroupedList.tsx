import React, { useEffect, useState } from "react"
import { Card, Col, Row, Tag } from "antd";

interface IDetailsGroupedListProp {
  data: [object],
  groupBy: string
}
interface Dic {
  [key: string]: { id: any, name: string }[]
}

const processData = (_k: any, a: any[]) => a.reduce((r: { [x: string]: any; }, { [_k]: k, ...p }: any) => ({
  ...r, ...{
    [k]: (
      r[k] ? [...r[k], { ...p }] : [{ ...p }]
    )
  }
}), {});

export default function GroupedList(props: IDetailsGroupedListProp) {

  const [processedData, setProcessedData] = useState<Dic | undefined>(undefined)

  useEffect(() => {
    setProcessedData(processData(props.groupBy, props.data))
  }, [props])

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={24}>
          {
            processedData && Object.keys(processedData).map((group: string) => (
              <Card title={group} size={'small'} style={{ marginBottom: 4 }}>
                {
                  processedData[group].map((permission: { id: any, name: string }) => <Tag>{permission.name}</Tag>)
                }
              </Card>
            ))
          }
        </Col>
      </Row>
    </div>
  )
}