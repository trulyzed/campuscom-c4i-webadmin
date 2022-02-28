import React from "react"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { Button } from "antd"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseSearchMeta } from "~/TableSearchMeta/Course/CourseSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Courses"}
      meta={CourseSearchMeta}
      blocks={[<Button>Add New</Button>]}
      tableProps={getCourseListTableColumns()}
    />
  )
}
