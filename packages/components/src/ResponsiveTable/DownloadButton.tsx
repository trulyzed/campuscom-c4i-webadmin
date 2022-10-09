import React, { useState } from "react"
import { Button, } from "antd"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export const DownloadButton = (props: {
  searchFunc: IQuery
  searchParams: { [key: string]: any }
  fileType: "EXCEL" | "CSV"
}) => {
  const [downloading, setDownloading] = useState(false)
  const downloadData = () => {
    let header = {}
    switch (props.fileType) {
      case "EXCEL":
        header = { ResponseType: "application/vnd.ms-excel" }
        break
      case "CSV":
        header = { ResponseType: "text/csv" }
        break
    }
    setDownloading(true)
    props.searchFunc({ params: props.searchParams, headers: header }).finally(() => setDownloading(false))
  }
  return (
    <Button
      aria-label={"Download Table Data"}
      title={`Export to ${props.fileType}`}
      onClick={() => downloadData()}
      loading={downloading}
    >{`Export to ${props.fileType}`}</Button>
  )
}
