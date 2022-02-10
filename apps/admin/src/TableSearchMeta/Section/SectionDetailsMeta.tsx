import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { getSectionScheduleTableColumns } from "~/TableSearchMeta/Section/SectionScheduleTableColumns"
import { getSectionGradeTableColumns } from "~/TableSearchMeta/Section/SectionGradeTableColumns"
import { getUser } from "@packages/api/lib/utils/TokenStore"
import { Link } from "react-router-dom"
import { IconButton } from "@packages/components/lib/Form/Buttons/IconButton"

const EmailFormModalOpenButton = (props: { SectionID: number; IsCompletedSection: boolean }) => {
  return (
    <>
      {props.IsCompletedSection ? (
        <Link to={`/completed-sections/${props.SectionID}/send-email/${props.SectionID}?IsCompletedSection=true`}>
          <IconButton iconType="email" toolTip="Send Email" />
        </Link>
      ) : (
        <Link to={`/current-sections/${props.SectionID}/send-email/${props.SectionID}?IsCompletedSection=false`}>
          <IconButton iconType="email" toolTip="Send Email" />
        </Link>
      )}
    </>
  )
}
export const getSectionDetailsMeta = (record: { [key: string]: any }): IDetailsMeta => {
  const Faculty: any = getUser()
  console.log("record in section details:", record)

  const summary: CardContainer = {
    title: "Summary",
    cardActions: [
      <EmailFormModalOpenButton SectionID={record.SectionID} IsCompletedSection={record.IsCompletedSection} />
    ],
    contents: [
      {
        label: "Offering Name",
        value: record.OfferingName
      },
      {
        label: "Description",
        value: record.OfferingDescription
      },
      { label: "Section Number", value: record.SectionNumber },
      { label: "CEU Hours", value: record.SectionCEUHours },
      { label: "Max Enrollment", value: record.MaxEnrollment },
      { label: "Estimate Enrollment", value: record.EstimatedEnrollment },
      { label: "Actual Enrollment", value: record.ActualEnrollment },
      { label: "Reserved Seats", value: record.ReservedSeats }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  return {
    pageTitle: `${record.SectionNumber}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Grade",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getSectionGradeTableColumns(),
            searchParams: { SectionID: record.SectionID, FacultyID: Faculty.FacultyID }
          }
        }
      },
      {
        tabTitle: "Schedule",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getSectionScheduleTableColumns(),
            searchParams: { SectionID: record.SectionID }
          }
        }
      }
    ]
  }
}
