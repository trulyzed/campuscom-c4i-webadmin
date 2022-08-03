import React from "react"
import { Button, } from "antd"
import { RESPONSE_TYPE } from "~/packages/services/Api/utils/Interfaces"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export const DownloadButton = (props: {
  searchFunc: IQuery
  searchParams: { [key: string]: any }
  setDownloading: (flag: boolean) => void
  downloading: boolean
  fileType: "CSV" | "EXCEL"
}) => {
  const downloadData = () => {
    let header = {}
    switch (props.fileType) {
      case RESPONSE_TYPE.EXCEL:
        header = { ResponseType: "application/vnd.ms-excel" }
        break
      case RESPONSE_TYPE.CSV:
        header = { ResponseType: "text/csv" }
        break
    }

    props.setDownloading(true)
    props.searchFunc({ params: props.searchParams, headers: header }).finally(() => props.setDownloading(false))
  }
  return (
    <Button
      aria-label={"Download Table Data"}
      title={`Export to ${props.fileType}`}
      onClick={() => downloadData()}
    >{`Export to ${props.fileType}`}</Button>
  )
}
