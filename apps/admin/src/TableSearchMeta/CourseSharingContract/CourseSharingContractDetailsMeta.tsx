import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"

export const getCourseSharingContractDetailsMeta = (courseSharingContract: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Course Sharing Contract: ${courseSharingContract.course_provider.name} for (${courseSharingContract.store.name})`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${courseSharingContract.store.id}`, courseSharingContract.store.name), },
      { label: 'Course Provider', value: renderLink(`/administration/course-provider/${courseSharingContract.course_provider.id}`, courseSharingContract.course_provider.name), },
      { label: 'Contract Date', value: courseSharingContract.contract_datetime, render: renderDateTime },
      { label: 'Is Active', value: courseSharingContract.is_active, render: renderBoolean },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "courseSharingContractSummaryTab"
    },
  ]

  return {
    pageTitle: `Course Sharing Contract Title - ${courseSharingContract.course_provider.name} for (${courseSharingContract.store.name})`,
    tabs: tabMetas
  }
}
