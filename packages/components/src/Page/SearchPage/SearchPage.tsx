import React, { ComponentProps, useCallback, useEffect, useRef, useState } from "react"
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
import { TableFilterFormOpener } from "./TableFilterFormOpener"
import { ISavedFilter, SavedFiltersForm } from "./SavedFiltersForm"

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
  const [selectedSavedFilter, setSelectedSavedFilter] = useState<ISavedFilter | undefined>()
  const applicableSearchParamsMeta = useRef<IFormValueMeta | null>()
  const metaDrivenFormRef = useRef<MetaDrivenFormHandle>(null)
  const tableTitle = props.searchTitle || (props.title ? `${props.title} Filter` : undefined)
  const [meta, setMeta] = useState<IField[]>([...props.meta || []])
  const isNullApplicableSearchParamsMeta = applicableSearchParamsMeta.current === null

  const handleSavedFilterChange: ComponentProps<typeof SavedFiltersForm>['onValuesChange'] = useCallback((_, filter) => {
    metaDrivenFormRef.current?.resetFields()
    setTimeout(() => {
      metaDrivenFormRef.current?.toggleFields?.(Object.keys(filter?.configurations || {}).reduce((a, c) => {
        a[c] = true
        return a
      }, {} as Record<string, any>))
      metaDrivenFormRef.current?.setFieldsValue(filter?.configurations)
    }, 0);
    applicableSearchParamsMeta.current = filter?.meta
    setSelectedSavedFilter(filter)

    setMeta(props.meta?.reduce((a, c) => {
      if (filter?.configurations.hasOwnProperty(c.fieldName)) {
        a.push({
          ...c,
          defaultValue: filter.configurations[c.fieldName]
        })
      }
      return a
    }, [] as IField[]) || [])

  }, [props.meta])

  const updateURL = useCallback((values) => {
    if (!stopProducingQueryParams) {
      const _queryString = objectToQueryString(Object.keys(values).length > 0 ? values : null)
      window.history && window.history.pushState({}, "", _queryString)
    }
  }, [stopProducingQueryParams])

  const handleApplyFilters: IMetaDrivenFormProps['onApplyChanges'] = useCallback((newFilterValues, meta) => {
    const newValues = {
      ...defaultFormValue,
      ...newFilterValues,
    }
    setSearchParams(newValues)
    if (applicableSearchParamsMeta.current) {
      setSearchParamsMeta(applicableSearchParamsMeta.current)
      applicableSearchParamsMeta.current = undefined
    } else setSearchParamsMeta(meta)
    if (newFilterValues["pagination"]) setCurrentPagination(newFilterValues["pagination"])
    else setCurrentPagination(1)
    updatedParams?.(newValues)
    updateURL({ ...newValues })
  }, [defaultFormValue, updatedParams, updateURL])

  const handleRemoveFilter = useCallback((fieldName: IField['fieldName']) => {
    const newFilterValues = { ...searchParams }
    const meta = { ...searchParamsMeta }
    delete newFilterValues[fieldName]
    delete meta[fieldName]

    updateURL(newFilterValues)
    metaDrivenFormRef.current?.toggleFields?.(Object.keys(newFilterValues).reduce((a, c) => {
      a[c] = true
      return a
    }, {} as { [key: string]: any }))
    handleApplyFilters(newFilterValues, meta)
  }, [handleApplyFilters, searchParams, searchParamsMeta, updateURL])

  const handleReset = useCallback(() => {
    applicableSearchParamsMeta.current = { ...searchParamsMeta }
    setSelectedSavedFilter(undefined)
    setMeta((props.meta || []).map(i => ({ ...i, defaultValue: undefined })))
    setTimeout(() => {
      metaDrivenFormRef.current?.reset()
    }, 0)
  }, [props.meta, searchParamsMeta])

  useEffect(() => {
    metaDrivenFormRef.current?.submitRef?.focus()
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
                    onClear={() => metaDrivenFormRef.current?.clear()}
                    onReset={handleReset}
                    onValuesChange={handleSavedFilterChange}
                  />
                  : null
                }
                <MetaDrivenForm
                  key={`form__${selectedSavedFilter?.id}`}
                  ref={metaDrivenFormRef}
                  title={!props.tableProps.tableName ? tableTitle : undefined}
                  blocks={props.blocks}
                  helpKey={props.helpKey}
                  meta={meta}
                  metaName={props.metaName}
                  stopProducingQueryParams={props.stopProducingQueryParams}
                  initialFormValue={props.initialFormValue}
                  setCurrentPagination={setCurrentPagination}
                  onApplyChanges={handleApplyFilters}
                  onFormValueMetaChange={(meta) => !isNullApplicableSearchParamsMeta && !applicableSearchParamsMeta.current && setSearchParamsMeta((prevValue) => ({
                    ...prevValue,
                    ...meta
                  }))}
                  extraActions={props.tableProps.tableName ? [<TableFilterFormOpener tableName={props.tableProps.tableName} />] : []}
                  autoApplyChangeFromQueryParams={!isNullApplicableSearchParamsMeta && !applicableSearchParamsMeta.current}
                  isVertical
                  isAside
                  showFullForm
                  enableFormItemToggle
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
                searchParams={searchParams}
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
