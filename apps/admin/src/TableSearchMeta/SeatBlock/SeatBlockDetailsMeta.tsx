import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink, renderCopyToClipboard } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"

export const getSeatBlockDetailsMeta = (seatBlock: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Seat Block: ${seatBlock.reservation_ref}`,
    cardActions: [
      ...seatBlock.token_type === "group" ? [<ContextAction
        tooltip="Generate Individual Tokens"
        confirmationType="generate"
        queryService={QueryConstructor((data) => SeatBlockQueries.generateIndividualTokens({ ...data, data: { ...data?.data, reservation_id: seatBlock.id } }), [SeatBlockQueries.generateIndividualTokens])}
        text={"Generate Individual Tokens"}
        refreshEventName={REFRESH_PAGE}
      />] : []
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${seatBlock.store.id}`, seatBlock.store.name) },
      { label: 'Order ID', value: renderLink(`/storefront-data/order/${seatBlock.cart.id}`, seatBlock.cart.order_ref) },
      { label: 'Purchaser', value: seatBlock.purchaser.name },
      { label: 'Product', value: renderLink(`/store/product/${seatBlock.product.id}`, seatBlock.product.name) },
      { label: 'Order Date', value: seatBlock.reservation_date, render: renderDateTime },
      { label: 'Number of Seats', value: seatBlock.number_of_seats },
      { label: 'Registered Students', value: seatBlock.registered_students },
      { label: 'Available Seats', value: seatBlock.available_seats },
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
      helpKey: "seatBlockSummaryTab"
    },
    {
      tabTitle: "Tokens",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Enrollment",
              dataIndex: "enrollment",
              render: (text: any) => text ? renderLink(`/administration/enrollment/${text.id}`, text.ref_id) : undefined,
              sorter: (a: any, b: any) => a.enrollment?.ref_id - b.enrollment?.ref_id
            },
            {
              title: "Token",
              dataIndex: "token",
              render: (text) => renderCopyToClipboard(`${process.env.REACT_APP_ENROLLMENT_URL}/registration/${seatBlock.store.url_slug}?token=${text}&guest=true`, { successMessage: "Token URL copied", title: text }),
              sorter: (a: any, b: any) => a.token - b.token
            },
            {
              title: "Student",
              dataIndex: "profile",
              render: (text: any) => text ? renderLink(`/storefront-data/student/${text.id}`, text.name) : undefined,
              sorter: (a: any, b: any) => a.profile?.name - b.profile?.name
            },
          ],
          searchFunc: SeatBlockQueries.getSeatList,
          searchParams: { reservation_id: seatBlock.id }
        }
      },
      helpKey: "reservationTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: seatBlock.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Seat Block Reference - ${seatBlock.reservation_ref}`,
    tabs: tabMetas
  }
}
