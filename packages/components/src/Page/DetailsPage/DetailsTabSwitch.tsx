import React, { useEffect, useState } from "react"
import { Tabs } from "antd"
import { DetailsSummary } from "~/Page/DetailsPage/DetailsSummaryTab"
import { DetailsSearchTab, IDetailsSearchTabProp } from "~/Page/DetailsPage/DetailsSearchTab"
import { DetailsTableTab, IDetailsTableTabProp } from "~/Page/DetailsPage/DetailsTableTab"
import { DetailsCustomTab, IDetailsCustomTabProp } from "~/Page/DetailsPage/DetailsCustomTab"
import { IDetailsTabMeta } from "~/Page/DetailsPage/Common"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { IDetailsSummary } from "~/Page/DetailsPage/DetailsPageInterfaces"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"

export interface IDetailsPageSubTab {
  meta: IDetailsTabMeta
  actions?: JSX.Element[]
}

export function DetailsPageSubTabSwitch(props: {
  meta?: IDetailsTabMeta[]
  currentTabKeysInURL?: string
  child: any
  actions?: JSX.Element[]
  tabLevel: number
  updateHelpKey: (helpKey: any) => void
  setCurrentTabKeysInURL: (tabKeys: string) => void
}) {
  const [activeTabKey, setActiveTabKey] = useState("1")

  const changeActiveTabkey = (key: string) => {
    setActiveTabKey(key)

    const queryParams: any = querystringToObject()
    if (queryParams && queryParams["activeTabKey"]) {
      const __queryParams = queryParams["activeTabKey"].toString().split("-")
      __queryParams[props.tabLevel] = `${key}-1`
      queryParams["activeTabKey"] = __queryParams.slice(0, props.tabLevel + 1).join("-")

      props.meta && props.updateHelpKey(queryParams["activeTabKey"])
      props.setCurrentTabKeysInURL(queryParams["activeTabKey"])

      const _queryString = objectToQueryString(queryParams)
      window.history && window.history.pushState({}, "", _queryString)
    }
  }

  useEffect(() => {
    const queryParams: { [key: string]: any } = querystringToObject()
    if (queryParams && queryParams["activeTabKey"]) {
      props.meta && props.updateHelpKey(queryParams["activeTabKey"])
      props.setCurrentTabKeysInURL(queryParams["activeTabKey"])

      const currentActiveTabkey = queryParams["activeTabKey"].toString().split("-")[props.tabLevel]
      if (currentActiveTabkey) setActiveTabKey(currentActiveTabkey)
    }
    // eslint-disable-next-line
  }, [props.tabLevel])

  useEffect(() => {
    if (props.currentTabKeysInURL) {
      const _activeTabKey = props.currentTabKeysInURL.toString().split("-")[props.tabLevel]
      setActiveTabKey(_activeTabKey)
    }
    // eslint-disable-next-line
  }, [props.currentTabKeysInURL])

  return (
    <>
      {props.meta && props.meta.length > 0 ? (
        <Tabs
          activeKey={activeTabKey}
          onChange={changeActiveTabkey}
          type="card"
          size="large"
          tabBarExtraContent={props.actions ? props.actions : []}
        >
          {props.meta
            .filter((x) => {
              // console.log("tabMeta ", x.tabMeta)
              if (
                x.tabMeta &&
                (x.tabType === "table" || x.tabType === "searchtable") &&
                !!(x?.tabMeta as any)?.tableProps?.searchFunc
              ) {
                //console.log((x?.tabMeta as any)?.tableProps?.tableName)
                return checkAdminApiPermission((x?.tabMeta as any)?.tableProps?.searchFunc)
              }
              return true
            })
            .map((x, i) => {
              i = i + 1
              switch (x.tabType) {
                case "summary":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsSummary {...(x.tabMeta as IDetailsSummary)} />
                    </Tabs.TabPane>
                  )
                case "searchtable":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsSearchTab {...(x.tabMeta as IDetailsSearchTabProp)} />
                    </Tabs.TabPane>
                  )
                case "table":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsPageSubTabSwitch
                        updateHelpKey={props.updateHelpKey}
                        setCurrentTabKeysInURL={props.setCurrentTabKeysInURL}
                        tabLevel={props.tabLevel + 1}
                        currentTabKeysInURL={props.currentTabKeysInURL}
                        // nextActivechildTabKeys={nextActivechildTabKeys}
                        meta={x.multipleTabMetas}
                        actions={x.actions}
                        child={<DetailsTableTab {...(x.tabMeta as IDetailsTableTabProp)} />}
                      />
                    </Tabs.TabPane>
                  )
                case "custom":
                  return (
                    <Tabs.TabPane tab={x.tabTitle} key={i}>
                      <DetailsCustomTab {...(x.tabMeta as IDetailsCustomTabProp)} />
                    </Tabs.TabPane>
                  )

                default:
                  return <p>Can not load</p>
              }
            })}
        </Tabs>
      ) : (
        props.child
      )}
    </>
  )
}
