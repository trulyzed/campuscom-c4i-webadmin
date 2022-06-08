import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { List } from "~/packages/components/DisplayFormatter/List"

export const getCareerDetailsMeta = (career: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Career: ${career.name}`,
    contents: [
      { label: 'Name', value: career.name, },
      { label: 'SOC Code', value: career.soc_code, },
      { label: 'Slug', value: career.slug, },
      { label: 'Description', value: career.description, },
      { label: 'Sample Job Titles', value: career.sample_job_titles, render: (text) => <List data={text} /> },
      { label: 'Bright Outlook', value: career.bright_outlook, render: renderBoolean },
      { label: 'Green', value: career.green, render: renderBoolean },
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
      helpKey: "careerSummaryTab"
    },
  ]

  return {
    pageTitle: `Career Title - ${career.name}`,
    tabs: tabMetas
  }
}
