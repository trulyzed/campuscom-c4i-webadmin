import { ReactNode, useMemo } from "react"
import { Col, Row, Tag, Typography } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { renderBoolean, renderDate } from "~/ResponsiveTable"
import { IField } from "~/Form/common"
import { IFormValueMeta } from "~/Form/MetaDrivenForm"
import pluralize from "pluralize"

interface IFilterSummaryProps {
  meta?: IField[]
  searchParams?: { [key: string]: any }
  searchParamsMeta?: IFormValueMeta
  onRemove?: (fieldName: IField['fieldName']) => void
}

export const FilterSummary = ({
  meta,
  searchParams,
  searchParamsMeta,
  onRemove,
}: IFilterSummaryProps) => {
  const filters = useMemo(() => {
    if (!meta) return []
    const searchParamKeys = Object.keys(searchParams || {})
    return meta.reduce((a, c) => {
      if (searchParamKeys.find(key => c.fieldName === key)) {
        let value
        switch (c.inputType) {
          case 'DATE_PICKER':
            value = renderDate(searchParams?.[c.fieldName])
            break
          case 'BOOLEAN':
            value = renderBoolean(searchParams?.[c.fieldName])
            break
          case 'DROPDOWN':
            value = Array.isArray(searchParamsMeta?.[c.fieldName]?.option) ?
              searchParamsMeta?.[c.fieldName]?.option?.map((i: DefaultOptionType) => i.children).join(', ')
              : (searchParamsMeta?.[c.fieldName]?.option as DefaultOptionType)?.children
            break
          default:
            value = searchParams?.[c.fieldName]
        }
        a.push({
          key: c.fieldName,
          name: c.label,
          value,
        })
      }
      return a
    }, [] as { key: IField['fieldName']; name: ReactNode; value: any }[])
  }, [meta, searchParams, searchParamsMeta])

  return (
    <>
      {filters.length ?
        <Row style={{ backgroundColor: "#ffffff" }} className={'mb-10 pb-10'}>
          <Col md={24} className={"ml-10 mt-10"}>
            <Typography.Title level={5}>Filter Summary: ({filters.length} {pluralize('filter', filters.length)} applied)</Typography.Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {filters.map((i) => (
                <Tag key={i.key} style={{ margin: 0 }} onClose={() => onRemove?.(i.key)} closable>{i.name}: {i.value}</Tag>
              ))}
            </div>
          </Col>
        </Row>
        : null}
    </>
  )
}