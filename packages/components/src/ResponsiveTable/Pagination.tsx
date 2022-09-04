import React, { useCallback } from "react"
import { Button, PaginationProps, Pagination as AntdPagination, Space } from "antd"
import { DEFAULT_PAGE_SIZE } from "./Responsive"

export const Pagination = (props: {
  current: number
  total?: number
  onChange: (page: number, pageSize?: number) => void
  defaultPageSize: number
  showSummary?: boolean
  containerStyle?: React.CSSProperties
}) => {
  const startPos = ((props.current - 1) * props.defaultPageSize) + 1
  let endPos = props.current * props.defaultPageSize
  endPos = endPos > (props.total || 0) ? (props.total || 0) : endPos
  const showingAll = props.defaultPageSize === props.total

  const itemRender: PaginationProps['itemRender'] = useCallback((_, type, originalElement) => {
    if (type === 'prev') {
      return <Button title="Previous" children="Prev" />
    }
    if (type === 'next') {
      return <Button title="Next" children="Next" />
    }
    return originalElement;
  }, [])

  const handleShowAll = useCallback((reset?: boolean) => {
    props.onChange(1, reset ? DEFAULT_PAGE_SIZE : props.total)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="mt-5 ml-10 mb-15" style={props.containerStyle}>
      {props.showSummary ?
        <p>
          Viewing {startPos} to {endPos} of {props.total}
        </p>
        : null}
      <Space wrap>
        <AntdPagination
          total={props.total || 0}
          pageSize={props.defaultPageSize}
          current={props.current}
          onChange={props.onChange}
          showSizeChanger={false}
          itemRender={itemRender}
          showLessItems
        />
        {(props.total || 0) <= DEFAULT_PAGE_SIZE ? null
          : showingAll ?
            <Button title="Reset" children={"Reset"} onClick={() => handleShowAll(true)} />
            : <Button title="Show All" children={"Show All"} onClick={() => handleShowAll()} />
        }
      </Space>
    </div>
  )
}
