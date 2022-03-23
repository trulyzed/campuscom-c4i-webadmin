import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getCourseProviderListTableColumns } from "~/TableSearchMeta/CourseProvider/CourseProviderListTableColumns"
import { CourseProviderSearchMeta } from "~/TableSearchMeta/CourseProvider/CourseProviderSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Course Providers"}
      meta={CourseProviderSearchMeta}
      tableProps={getCourseProviderListTableColumns()}
    />
  )
}
