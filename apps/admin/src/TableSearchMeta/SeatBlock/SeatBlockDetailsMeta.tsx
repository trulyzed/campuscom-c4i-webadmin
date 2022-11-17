import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink, renderCopyToClipboard } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"
import { CreateOrder, ICreateOrderInitialValue } from "~/Component/Feature/Orders/Create/CreateOrder"
import { CLOSE_MODAL } from "~/Constants"
import { SeatQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Seats"
import { parseEnrollmentUrl, parseQuestionAnswer } from "@packages/components/lib/Utils/parser"

export const getSeatBlockDetailsMeta = (seatBlock: { [key: string]: any }): IDetailsMeta => {
  const getInitialValue = (record: Record<string, any>): ICreateOrderInitialValue => {
    return {
      reservationId: record.id,
      store: seatBlock.store,
      purchaser: {
        ...seatBlock.purchaser,
        purchasing_for: seatBlock.purchaser.purchasing_for ? {
          ...seatBlock.purchaser.purchasing_for,
          ref: seatBlock.purchaser.purchasing_for.ref?.id
        } : undefined,
        extra_info: {
          ...parseQuestionAnswer(seatBlock.purchaser.extra_info),
        }
      },
      product: {
        ...seatBlock.product,
        title: seatBlock.product.name
      },
      profile: record.profile ? {
        ...record.profile,
        name: `${record.profile.name} (${record.profile.email})`,
        primary_email: record.profile.email,
      } : undefined
    }
  }

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
      { label: 'Group Token', value: seatBlock.token, render: (text) => seatBlock.token_type === "group" ? renderCopyToClipboard(parseEnrollmentUrl('registration', text, seatBlock.store.url_slug, seatBlock.store.domain), { successMessage: "Token URL copied", title: text }) : "N/A" },
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
              title: "Token",
              dataIndex: "token",
              render: (text, record) => renderCopyToClipboard(parseEnrollmentUrl('registration', text, seatBlock.store.url_slug, seatBlock.store.domain), {
                successMessage: "Token URL copied",
                title: renderLink(`/storefront-data/seat-block/token/${record.id}`, text)
              }),
              sorter: (a: any, b: any) => a.token - b.token
            },
            {
              title: "Student",
              dataIndex: "profile",
              render: (text: any) => text ? renderLink(`/storefront-data/student/${text.id}`, text.name) : undefined,
              sorter: (a: any, b: any) => a.profile?.name - b.profile?.name
            },
            {
              title: "Enrollment",
              dataIndex: "enrollment",
              render: (text: any) => text ? renderLink(`/administration/enrollment/${text.id}`, text.ref_id) : undefined,
              sorter: (a: any, b: any) => a.enrollment?.ref_id - b.enrollment?.ref_id
            },
            {
              title: "Actions",
              dataIndex: 'actions',
              render: (_, record: any, index) => (
                <>
                  {!record.profile ?
                    <ContextAction
                      type="add"
                      tooltip="Enroll"
                      modalProps={{
                        title: "Enroll Student",
                        content: <CreateOrder
                          initialValue={getInitialValue(record)}
                          refreshEventName={["REFRESH_TOKEN_LIST", `${CLOSE_MODAL}__${index}`]}
                        />,
                        closeEventName: `${CLOSE_MODAL}__${index}`
                      }}
                    />
                    : null}
                  {record.profile ?
                    <ContextAction
                      type="swap"
                      tooltip="Swap"
                      modalProps={{
                        title: "Swap Student",
                        content: <CreateOrder
                          initialValue={getInitialValue(record)}
                          refreshEventName={["REFRESH_TOKEN_LIST", `${CLOSE_MODAL}__${index}`]}
                          isSwap
                        />,
                        closeEventName: `${CLOSE_MODAL}__${index}`
                      }}
                    />
                    : null}
                  {record.profile ?
                    <ContextAction
                      confirmationType="Drop/withdraw"
                      type="drop"
                      tooltip="Drop/Withdraw"
                      queryService={QueryConstructor(() => SeatBlockQueries.removeRegistration({ data: { seat_reservation: record.id } }), [SeatBlockQueries.removeRegistration])}
                      refreshEventName="REFRESH_TOKEN_LIST"
                      iconColor="warning"
                    />
                    : null}
                </>
              )
            }
          ],
          searchFunc: SeatQueries.getPaginatedList,
          searchParams: { reservation_id: seatBlock.id },
          refreshEventName: "REFRESH_TOKEN_LIST"
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