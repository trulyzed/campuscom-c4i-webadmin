import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getReservationFormMeta } from "~/Component/Feature/Reservations/FormMeta/ReservationFormMeta"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"

export const getReservationDetailsMeta = (reservation: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CompanyQueries.update({ ...data, params: { id: reservation.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CompanyQueries.update])

  const summaryInfo: CardContainer = {
    title: `Seat Reservation: ${reservation.ref_id}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Add Student`}
        formMeta={getReservationFormMeta(reservation)}
        formSubmitApi={updateEntity}
        buttonLabel={`Add Student`}
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${reservation.store.id}`, reservation.store.name) },
      { label: 'Purchaser', value: reservation.purchaser },
      { label: 'Order Ref', value: renderLink(`/administration/order/${reservation.order_ref}`, reservation.order_ref) },
      { label: 'Order Date', value: reservation.order_date, render: renderDateTime },
      { label: 'Number of Seats', value: reservation.number_of_seats },
      { label: 'Registered Students', value: reservation.registered_students },
      { label: 'Available Seats', value: reservation.available_seats },
      { label: 'Expiry Date', value: reservation.expires_on, render: renderDateTime },
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
      helpKey: "reservationSummaryTab"
    },
    {
      tabTitle: "Students",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "name",
              render: (text: any, record: any) => record.id ? renderLink(`/administration/contact/${record.id}`, text) : text,
              sorter: (a: any, b: any) => a.name - b.name
            },
          ],
          searchFunc: ContactQueries.getLookupData,
          searchParams: {}
        }
      },
      helpKey: "studentTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: reservation.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Seat Reservation Title - ${reservation.ref_id}`,
    tabs: tabMetas
  }
}
