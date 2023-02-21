import React, { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button, Col, Result, Row } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { IFormValueMeta, IMetaDrivenFormProps, MetaDrivenForm, MetaDrivenFormHandle } from "~/Form/MetaDrivenForm"
import { IField } from "~/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/ResponsiveTable"
import { HelpButton } from "~/Help/HelpButton"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"
import { DEFAULT_PAGE_SIZE } from "~/ResponsiveTable/Responsive"
import { FilterSummary } from "./FilterSummary"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { TableFilterFormOpener } from "./TableFilterFormOpener"
import { SavedFiltersForm, SAVED_FILTER_FIELDNAME } from "./SavedFiltersForm"

export interface ISearchListWithVisibleSearchFormProp {
  title?: string
  mainTitle?: string
  tableTitle?: string
  searchTitle?: string
  blocks?: JSX.Element[]
  meta?: IField[]
  metaName?: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  helpKey?: string
  stopProducingQueryParams?: boolean
  initSearchAtMount?: boolean
  updatedParams?: (params?: any) => void
  hideHeading?: boolean
  onChange?: (args: { data: any; searchParams: any }) => void
  tableFooter?: React.ReactNode
}

export function SearchPage(props: ISearchListWithVisibleSearchFormProp) {
  const { defaultFormValue, updatedParams, stopProducingQueryParams } = props
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [searchParamsMeta, setSearchParamsMeta] = useState<IFormValueMeta>()
  const [currentPagination, setCurrentPagination] = useState<number>()
  const [pagination, setPagination] = useState<{ currentPage: number, total: number, currentPageSize: number }>({
    currentPage: 1,
    total: 0,
    currentPageSize: DEFAULT_PAGE_SIZE
  })
  const metadrivenFormRef = useRef<MetaDrivenFormHandle>(null)
  const isAppliedSavedFilter = !!querystringToObject()?.[SAVED_FILTER_FIELDNAME]
  const tableTitle = props.searchTitle || (props.title ? `${props.title} Filter` : undefined)

  const tableSearchParams = useMemo(() => {
    const adjustedParams = searchParams ? { ...searchParams } : undefined
    delete adjustedParams?.[SAVED_FILTER_FIELDNAME]
    return adjustedParams
  }, [searchParams])

  const handleApplyFilters: IMetaDrivenFormProps['onApplyChanges'] = useCallback((newFilterValues, meta) => {
    setSearchParams({
      ...defaultFormValue,
      ...newFilterValues,
    })
    setSearchParamsMeta(meta)
    updatedParams &&
      updatedParams({
        ...defaultFormValue,
        ...newFilterValues
      })
    if (newFilterValues["pagination"]) setCurrentPagination(newFilterValues["pagination"])
    else setCurrentPagination(1)
  }, [defaultFormValue, updatedParams])

  const updateURL = useCallback((values) => {
    if (!stopProducingQueryParams) {
      const _queryString = objectToQueryString(Object.keys(values).length > 0 ? values : null)
      window.history && window.history.pushState({}, "", _queryString)
    }
  }, [stopProducingQueryParams])

  const handleRemoveFilter = useCallback((fieldName: IField['fieldName']) => {
    const newFilterValues = { ...searchParams }
    const meta = { ...searchParamsMeta }
    delete newFilterValues[fieldName]
    delete meta[fieldName]

    updateURL(newFilterValues)
    metadrivenFormRef.current?.resetFields([fieldName])
    handleApplyFilters(newFilterValues, meta)
  }, [handleApplyFilters, searchParams, searchParamsMeta, updateURL])

  const handleApplySavedFilters: ComponentProps<typeof SavedFiltersForm>['onApply'] = useCallback((configurations, data, details) => {
    handleApplyFilters(configurations)
    updateURL({
      ...configurations,
      ...data
    })
    setSearchParamsMeta(details.meta)
  }, [updateURL, handleApplyFilters])

  useEffect(() => {
    metadrivenFormRef.current?.submitRef?.focus()
  }, [])

  useEffect(() => {
    if (props.initSearchAtMount) setSearchParams({ ...props.initialFormValue, ...defaultFormValue })
    // eslint-disable-next-line
  }, [props.initSearchAtMount])

  return (
    <div className="site-layout-content">
      {props.tableProps.searchFunc && checkAdminApiPermission(props.tableProps.searchFunc) && (
        <>
          {(!props.hideHeading && props.title) ?
            <Row>
              <Col md={24} xs={24} className={'mt-15'}>
                <Title level={3}>
                  {props.mainTitle || `Manage ${props.title}`}
                </Title>
              </Col>
              <Col md={24} xs={24} className={'mb-10'}>
                <Text style={{ textTransform: 'lowercase' }} type="secondary" className="ml-10">{pagination.total} {props.title} displayed</Text>
              </Col>
            </Row>
            : null}
          {!props.meta && (
            <Row
              justify="space-between"
              style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginBottom: "2px",
                padding: "10px"
              }}
            >
              {props.title && (
                <Col flex="none">
                  <SidebarMenuTargetHeading level={1} targetID="navigation">
                    {props.title}
                  </SidebarMenuTargetHeading>
                </Col>
              )}

              <Col flex="none">
                <Row>
                  {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
                  {props.helpKey && <HelpButton helpKey={props.helpKey} />}
                </Row>
              </Col>
            </Row>
          )}
          <Row gutter={25}>
            {props.meta &&
              <Col lg={6} xl={5} xs={24}>
                {props.tableProps.tableName ?
                  <SavedFiltersForm
                    title={tableTitle}
                    tableName={props.tableProps.tableName}
                    onApply={handleApplySavedFilters}
                    onClear={metadrivenFormRef.current?.clear}
                    onFormValueMetaChange={(meta) => setSearchParamsMeta(meta)}
                  />
                  : null
                }
                <MetaDrivenForm
                  ref={metadrivenFormRef}
                  title={!props.tableProps.tableName ? tableTitle : undefined}
                  blocks={props.blocks}
                  helpKey={props.helpKey}
                  meta={props.meta}
                  metaName={props.metaName}
                  stopProducingQueryParams={props.stopProducingQueryParams}
                  initialFormValue={props.initialFormValue}
                  setCurrentPagination={setCurrentPagination}
                  onApplyChanges={handleApplyFilters}
                  onFormValueMetaChange={(meta) => setSearchParamsMeta((prevValue) => ({
                    ...prevValue,
                    ...meta
                  }))}
                  extraActions={props.tableProps.tableName ? [<TableFilterFormOpener tableName={props.tableProps.tableName} />] : []}
                  autoApplyChangeFromQueryParams
                  isVertical
                  isAside
                  showFullForm
                  enableFormItemToggle
                  stopSettingDefaultFromQueryParams={isAppliedSavedFilter}
                  showClearbutton={!props.tableProps.tableName}
                />
              </Col>
            }
            <Col lg={18} xl={19} xs={24}>
              <FilterSummary
                meta={props.meta}
                searchParams={searchParams}
                searchParamsMeta={searchParamsMeta}
                onRemove={handleRemoveFilter} />
              <ResponsiveTable
                currentPagination={currentPagination}
                setCurrentPagination={setCurrentPagination}
                {...props.tableProps}
                tableTitle={props.tableTitle || props.title}
                searchParams={tableSearchParams}
                onPaginationChange={setPagination}
                dataLoaded={(data) => props.onChange?.({ data, searchParams })}
              />
              {props.tableFooter}
            </Col>
          </Row>
        </>
      )}
      {props.tableProps.searchFunc && !checkAdminApiPermission(props.tableProps.searchFunc) && (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary">Back Home</Button>}
        />
      )}
    </div>
  )
}
