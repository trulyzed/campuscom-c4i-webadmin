import React, { useEffect, useState } from "react"
import { Button, Calendar, Card, Empty, Spin } from "antd"
import moment, { Moment } from "moment"
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { useFirstRender } from "~/packages/components/Hooks/useFirstRender"
import { DATE_FORMAT } from "~/packages/components/ResponsiveTable/tableUtils"
import { Modal } from "~/packages/components/Modal/Modal"

export function CalenderWrapper(props: {
  searchApi: (Params: { [key: string]: any }) => Promise<IApiResponse>
  searchParams: { [key: string]: any }
  cellRenderer: (Params: any) => React.ReactNode
  cellDetailsRenderer: (Params: any) => React.ReactNode
  datePropName: string
}) {
  const firstRender = useFirstRender()
  const [loading, setloading] = useState(false)
  const [selectedDateInfo, setselectedDateInfo] = useState<{ value: Moment; cellData: any[] } | undefined>(undefined)
  const [data, setdata] = useState<{ [key: string]: any }[]>([])
  const loadData = () => {
    setloading(true)
    props
      .searchApi(props.searchParams)
      .then((response) => {
        if (response.success) {
          setdata(response.data)
        }
      })
      .finally(() => setloading(true))
  }
  useEffect(() => {
    eventBus.subscribe("REFRESH_CALENDER", loadData)
    eventBus.publish("REFRESH_CALENDER")
    return () => eventBus.unsubscribe("REFRESH_CALENDER")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!firstRender) loadData()
    // eslint-disable-next-line
  }, [props.searchParams])

  const getCellData = (value: Moment): { [key: string]: any }[] => {
    const cellData: { [key: string]: any }[] = []
    const date = value.format(DATE_FORMAT)
    if (data && data.length > 0) {
      for (const d of data) {
        const temp = moment(d.StartDate).format(DATE_FORMAT)
        if (date === temp) {
          cellData.push(d)
        }
      }
    }
    return cellData
  }

  const dateCellRender = (value: Moment) => {
    const cellData: { [key: string]: any }[] = getCellData(value)
    return (
      <div
        style={{
          border: "1px solid lightgray",
          height: "100px",
          backgroundColor: value.format(DATE_FORMAT) === moment().format(DATE_FORMAT) ? "#dbdbff" : "white"
        }}
      >
        <h1 style={{ textAlign: "center" }}>{value.date()}</h1>
        {props.cellRenderer(cellData)}
      </div>
    )
  }

  const onSelect = (value: Moment) => {
    const cellData: { [key: string]: any }[] = getCellData(value)
    if (cellData.length > 0) setselectedDateInfo({ value, cellData })
  }

  return (
    <>
      {selectedDateInfo && (
        <Modal width="1000px" closeModal={() => setselectedDateInfo(undefined)}>
          <Card
            title={<h1>Schedule for {selectedDateInfo.value.format(DATE_FORMAT)}</h1>}
            actions={[<Button onClick={() => setselectedDateInfo(undefined)}>Close</Button>]}
          >
            {props.cellDetailsRenderer(selectedDateInfo.cellData)}
          </Card>
        </Modal>
      )}
      {data.length > 0 && (
        <Calendar
          dateFullCellRender={dateCellRender}
          onSelect={onSelect}
          defaultValue={(data.length > 0 && moment(data[0][props.datePropName])) || undefined}
        />
      )}
      {data.length === 0 && <Empty description="No data found" />}
      {loading && (
        <Spin
          style={{
            margin: 0,
            position: "relative",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          size="large"
        />
      )}
    </>
  )
}
