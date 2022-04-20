import React from "react"
import { Button, Dropdown, Menu } from "antd"
import { RESPONSE_TYPE } from "~/packages/services/Api/utils/Interfaces"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export const DownloadButton = (props: {
  searchFunc: IQuery
  searchParams: { [key: string]: any }
  setDownloading: (flag: boolean) => void
  downloading: boolean
}) => {
  const downloadData = (fileType: string) => {
    let header = {}
    switch (fileType) {
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
    <Dropdown
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      trigger={["click"]}
      overlay={
        <Menu>
          <Menu.Item>
            <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.CSV)}>
              CSV
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.EXCEL)}>
              Excel
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <div>
        <IconButton iconType="download" disabled={props.downloading} toolTip="Download Table Data" />
      </div>
    </Dropdown>
  )
}
