import React, { useEffect, useState } from "react"
import { IApiErrorProcessor } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"
import { Button, Col, Empty, Result, Row, Spin, Tabs } from "antd"
import { DetailsSearchTab, IDetailsSearchTabProp } from "~/packages/components/Page/DetailsPage/DetailsSearchTab"
import { DetailsTableTab, IDetailsTableTabProp } from "~/packages/components/Page/DetailsPage/DetailsTableTab"
import { DetailsCustomTab, IDetailsCustomTabProp } from "~/packages/components/Page/DetailsPage/DetailsCustomTab"
import { eventBus, REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { IDetailsPage, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { DetailsPageSubTabSwitch } from "~/packages/components/Page/DetailsPage/DetailsTabSwitch"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { DetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsSummaryTab"
import { IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission"
import { GoToSearchResultPageButton } from "~/packages/components/Page/DetailsPage/GoToSearchResultPageButton"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"

export function DetailsPage(props: IDetailsPage) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string>()
  const [error, setError] = useState<IApiErrorProcessor>()
  const [meta, setMeta] = useState<IDetailsTabMeta[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string>()
  const [currentTabKeysInURL, setCurrentTabKeysInURL] = useState<string>()
  const [helpKey, setHelpKey] = useState<string | undefined>()

  const updateHelpKey = (tabKey: string) => {
    const tabIndexes: number[] = tabKey.split("-").map((x) => {
      return Number(x) - 1
    })
    let tabMeta: any
    tabIndexes.forEach((key, i) => {
      if (i === 0) {
        tabMeta = meta[tabIndexes[0]]
      } else if (tabMeta && tabMeta.multipleTabMetas) {
        tabMeta = tabMeta.multipleTabMetas[key]
      }
    })
    if (tabMeta) setHelpKey((tabMeta as IDetailsTabMeta).helpKey)
  }

  const changeActiveTabkey = (key: string) => {
    setActiveTabKey(key)
    const previousQueryString = querystringToObject()
    const _queryString = objectToQueryString({
      ...previousQueryString,
      activeTabKey: `${key}-1`
    })
    updateHelpKey(`${key}-1`)
    window.history && window.history.pushState({}, "", _queryString)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const __defaultTabKey: { [key: string]: any } = querystringToObject()
    if (__defaultTabKey && __defaultTabKey["activeTabKey"]) {
      const key = __defaultTabKey["activeTabKey"].toString().split("-")[0]
      setActiveTabKey(key)
    } else {
      changeActiveTabkey("1")
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentTabKeysInURL && currentTabKeysInURL.split("-").length <= 2) {
      updateHelpKey(currentTabKeysInURL)
    }
    // eslint-disable-next-line
  }, [meta, currentTabKeysInURL])

  useEffect(() => {
    // param: event: PopStateEvent
    window.onpopstate = function () {
      const __defaultTabKey: { [key: string]: any } = querystringToObject()
      if (__defaultTabKey && __defaultTabKey["activeTabKey"]) {
        setCurrentTabKeysInURL(__defaultTabKey["activeTabKey"])

        updateHelpKey(__defaultTabKey["activeTabKey"])
        const key = __defaultTabKey["activeTabKey"].toString().split("-")[0]
        setActiveTabKey(key)
      }
    }
    return () => {
      window.onpopstate = null
    }
    // eslint-disable-next-line
  }, [])

  const loadDetails = () => {
    if (process.env.NODE_ENV === "development" && props.getDetailsPageContent.name === "getDetailsPageContent")
      throw new Error(`Details Page does not have a valid getDetailsPageContent function, check console for details`)
    if (!checkAdminApiPermission(props.getDetailsPageContent)) return
    setLoading(true)
    setError(undefined)
    props
      .getDetailsPageContent()
      .then((x) => {
        if (x.success && x.data) {
          const { tabs, pageTitle } = props.getMeta(x.data, props.entityType, props.entityID)

          setMeta(tabs)
          setTitle(pageTitle)

          props.onDataLoad && props.onDataLoad(x.data)
        } else setError(x.error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const eventName = props.refreshEventName ? props.refreshEventName : REFRESH_PAGE

    eventBus.subscribe(eventName, loadDetails)
    eventBus.publish(eventName, loadDetails)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [props.entityID])

  if (!checkAdminApiPermission(props.getDetailsPageContent)) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    )
  }
  return (
    <>
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
      {!loading && error && (
        <Result
          status="warning"
          title="There are some problems while loading this page."
          extra={
            <Button
              type="primary"
              onClick={() => (window.location.href = window.location.origin + window.location.pathname)}
            >
              Reload
            </Button>
          }
        />
      )}
      {!loading && !error && meta.length === 0 && <Empty description="No data found in the given url" />}
      {!loading && !error && meta.length > 0 && (
        <div className="site-layout-content">
          <Row>
            <Col>
              <GoToSearchResultPageButton />
            </Col>
            {title && (
              <Col>
                <SidebarMenuTargetHeading level={1}>{title}</SidebarMenuTargetHeading>
              </Col>
            )}
            <Col flex="auto"></Col>
            <Col flex="auto">
              <Row justify="end" style={{ marginBottom: "5px" }}>
                {props.actions && props.actions?.map((x, i) => <Col key={i}>{x}</Col>)}
                <Col>
                  <HelpButton helpKey={helpKey} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Tabs activeKey={activeTabKey} onChange={changeActiveTabkey} type="card" size="large">
            {meta
              .filter((x) => {
                if (
                  x.tabMeta &&
                  (x.tabType === "table" || x.tabType === "searchtable") &&
                  !!(x?.tabMeta as any)?.tableProps?.searchFunc
                ) {
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
                        <DetailsPageSubTabSwitch
                          updateHelpKey={updateHelpKey}
                          setCurrentTabKeysInURL={setCurrentTabKeysInURL}
                          tabLevel={1}
                          currentTabKeysInURL={currentTabKeysInURL}
                          meta={x.multipleTabMetas}
                          child={<DetailsSummary {...(x.tabMeta as IDetailsSummary)} />}
                        />
                      </Tabs.TabPane>
                    )
                  case "searchtable":
                    return (
                      <Tabs.TabPane tab={x.tabTitle} key={i}>
                        <DetailsPageSubTabSwitch
                          updateHelpKey={updateHelpKey}
                          setCurrentTabKeysInURL={setCurrentTabKeysInURL}
                          tabLevel={1}
                          meta={x.multipleTabMetas}
                          currentTabKeysInURL={currentTabKeysInURL}
                          child={<DetailsSearchTab {...(x.tabMeta as IDetailsSearchTabProp)} />}
                        />
                      </Tabs.TabPane>
                    )
                  case "table":
                    return (
                      <Tabs.TabPane tab={x.tabTitle} key={i}>
                        <DetailsPageSubTabSwitch
                          updateHelpKey={updateHelpKey}
                          setCurrentTabKeysInURL={setCurrentTabKeysInURL}
                          tabLevel={1}
                          meta={x.multipleTabMetas}
                          currentTabKeysInURL={currentTabKeysInURL}
                          actions={x.actions}
                          child={<DetailsTableTab {...(x.tabMeta as IDetailsTableTabProp)} />}
                        />
                      </Tabs.TabPane>
                    )
                  case "custom":
                    return (
                      <Tabs.TabPane tab={x.tabTitle} key={i}>
                        <DetailsPageSubTabSwitch
                          updateHelpKey={updateHelpKey}
                          setCurrentTabKeysInURL={setCurrentTabKeysInURL}
                          tabLevel={1}
                          meta={x.multipleTabMetas}
                          currentTabKeysInURL={currentTabKeysInURL}
                          child={<DetailsCustomTab {...(x.tabMeta as IDetailsCustomTabProp)} />}
                        />
                      </Tabs.TabPane>
                    )

                  default:
                    return <p>Can not load</p>
                }
              })}
          </Tabs>
        </div>
      )}
    </>
  )
}
