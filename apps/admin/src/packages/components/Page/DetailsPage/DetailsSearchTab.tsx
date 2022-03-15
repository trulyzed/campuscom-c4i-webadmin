import React, { useState } from "react"
import { Col, Row } from "antd"
import { IField } from "~/packages/components/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/packages/components/ResponsiveTable"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { MetaDrivenFilterButton } from "~/packages/components/Form/MetaDrivenFilterButton"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export interface IBlockComponentProp {
  component: React.FunctionComponent<any>
  props: { [key: string]: any }
  rowData?: Array<any>
}

export interface IDetailsSearchTabProp {
  blocks?: JSX.Element[]
  blockComponents?: IBlockComponentProp[]
  title?: string
  searchTitle?: string
  searchMeta: IField[]
  searchMetaName: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  helpKey?: string
}

export function DetailsSearchTab(props: IDetailsSearchTabProp) {
  const [rowData, setRowData] = useState<Array<any>>([])
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>(props.initialFormValue || props.defaultFormValue || {})

  const funcName = props.tableProps.searchFunc ? props.tableProps.searchFunc?.name : "generic"
  const func = {
    [funcName]: function (params) {
      setSearchParams(params?.params)
      return Promise.resolve({
        code: 200,
        success: true,
        error: false,
        data: undefined
      })
    } as IQuery
  }

  const searchFilterButton: React.ReactNode = (
    <MetaDrivenFilterButton
      searchTitle={props.searchTitle}
      searchMeta={props.searchMeta}
      searchMetaName={props.searchMetaName}
      defaultFormValue={props.defaultFormValue}
      initialFormValue={{ ...props.initialFormValue, ...searchParams }}
      formSubmitApi={func[funcName]}
    />
  )

  return (
    <>
      <Row>
        {props.title && (
          <Col span={21}>
            <SidebarMenuTargetHeading level={1}>{props.title}</SidebarMenuTargetHeading>
          </Col>
        )}
        {props.helpKey && (
          <Col span={3}>
            <HelpButton helpKey={props.helpKey} />
          </Col>
        )}
      </Row>

      <Row justify="end" gutter={[8, 8]}>
        <Col></Col>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.blockComponents && props.blockComponents.map((x) => <x.component {...x.props} rowData={rowData} />)}
      </Row>
      <Row>
        <Col span={24}>
          <ResponsiveTable
            {...props.tableProps}
            actions={props.tableProps.actions ? [...props.tableProps.actions, searchFilterButton] : [searchFilterButton]}
            searchParams={{
              ...searchParams,
              ...props?.tableProps?.searchParams
            }}
            refreshEventName={props?.tableProps?.refreshEventName || "REFRESH_" + Date.now().toString()}
            dataLoaded={(Params: any[]) => setRowData(Params)}
          />
        </Col>
      </Row>
    </>
  )
}
