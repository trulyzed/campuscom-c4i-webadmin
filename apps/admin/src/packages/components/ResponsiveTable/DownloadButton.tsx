import React from "react"
import { Button, Dropdown, Menu } from "antd"
import { IApiResponse, RESPONSE_TYPE } from "~/packages/services/Api/utils/Interfaces"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

export const DownloadButton = (props: {
  searchFunc: (Params: any, Header: any) => Promise<IApiResponse>
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
    props.searchFunc(props.searchParams, header).finally(() => props.setDownloading(false))
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
      <IconButton iconType="download" disabled={props.downloading} toolTip="Download Table Data" />
    </Dropdown>
  )
}
