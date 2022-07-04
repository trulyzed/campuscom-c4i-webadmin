import { Button } from "antd"
import React, { useEffect, useState } from "react"

export const Pagination = (props: {
  current: number
  total?: number
  onChange: (page: number) => void
  defaultPageSize: number
}) => {
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setTotalPage(Math.ceil((props.total || 0) / props.defaultPageSize))
  }, [props.total, props.defaultPageSize])

  const next = () => {
    if (props.current < totalPage) props.onChange(props.current + 1)
  }
  const prev = () => {
    if (props.current > 1) props.onChange(props.current - 1)
  }
  return (
    <div>
      <Button type="primary" aria-label="Pagination Previous" onClick={prev}>
        {"<"}
      </Button>
      <span
        style={{
          border: "1px solid lightgray",
          borderRadius: "2px",
          width: "16px",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "6px",
          paddingBottom: "7px",
          marginRight: "5px",
          marginLeft: "5px"
        }}
        className={"pagination__page-count"}
      >
        {props.current}
      </span>
      <Button type="primary" aria-label="Pagination Next" onClick={next}>
        {">"}
      </Button>
      {props.total && props.total > 0 ? (
        <span
          style={{
            paddingTop: "5px",
            marginLeft: "5px"
          }}
        >
          {(props.current - 1) * props.defaultPageSize + 1} -{" "}
          {props.total && props.current * props.defaultPageSize > props.total
            ? props.total
            : props.current * props.defaultPageSize}{" "}
          of {props.total} Rows
        </span>
      ) : (
        ""
      )}
    </div>
  )
}
