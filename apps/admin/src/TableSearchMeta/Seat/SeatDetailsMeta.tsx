import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { SeatQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Seats"

export const getSeatDetailsMeta = (seat: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Token: ${seat.token}`,
    contents: [
      { label: 'Seat Block', value: renderLink(`/storefront-data/seat-block/${seat.reservation.id}`, seat.reservation.reservation_ref) },
      { label: 'Student', value: seat.profile ? renderLink(`/storefront-data/student/${seat.profile.id}`, seat.profile.name) : undefined },
      { label: 'Enrollment', value: seat.enrollment ? renderLink(`/administration/enrollment/${seat.enrollment.id}`, seat.enrollment.ref_id) : undefined, },
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
      helpKey: "seatSummaryTab"
    },
    {
      tabTitle: "Histories",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Profile",
              dataIndex: "profile",
              render: (text: any) => text ? renderLink(`/storefront-data/student/${text.id}`, text.name) : undefined,
              sorter: (a: any, b: any) => a.profile.name - b.profile.name
            },
            {
              title: "Action",
              dataIndex: "action",
              sorter: (a: any, b: any) => a.action - b.action
            },
            {
              title: "Time",
              dataIndex: "time",
              render: renderDateTime,
              sorter: (a: any, b: any) => a.time - b.time
            },
          ],
          searchFunc: SeatQueries.getHistoryList,
          searchParams: { seat_id: seat.id },
          refreshEventName: "REFRESH_HISTORY_LIST"
        }
      },
      helpKey: "historyTab"
    },
  ]

  return {
    pageTitle: `Token - ${seat.token}`,
    tabs: tabMetas
  }
}