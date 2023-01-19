import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { RefundQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Refunds"
import { notification } from "antd"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { REFRESH_PAGE, triggerEvents } from "@packages/utilities/lib/EventBus"

export const getRefundDetailsMeta = (refund: { [key: string]: any }): IDetailsMeta => {
  const cancelEnrollment = async () => {
    const resp = await RefundQueries.cancelEnrollment({ params: { refund_id: refund.id } })
    if (resp.success) triggerEvents(REFRESH_PAGE)
    else {
      if (Array.isArray(resp.error)) resp.error.forEach(e => notification.error({ message: e.message || 'Failed' }))
      else notification.error({ message: 'Failed' })
    }
  }

  // const updateTaxRecord = async () => {
  //   const resp = await RefundQueries.updateTaxRecord({ params: { refund_id: refund.id } })
  //   if (resp.success) triggerEvents(REFRESH_PAGE)
  //   else {
  //     if (Array.isArray(resp.error)) resp.error.forEach(e => notification.error({ message: e.message || 'Failed' }))
  //     else notification.error({ message: 'Failed' })
  //   }
  // }

  // const sendInfoToCRM = async () => {
  //   const resp = await RefundQueries.sendInformationToCRM({ params: { refund_id: refund.id } })
  //   if (resp.success) triggerEvents(REFRESH_PAGE)
  //   else {
  //     if (Array.isArray(resp.error)) resp.error.forEach(e => notification.error({ message: e.message || 'Failed' }))
  //     else notification.error({ message: 'Failed' })
  //   }
  // }

  const summaryInfo: CardContainer = {
    title: `Refund: ${refund.id}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${refund.store.id}`, refund.store.name), },
      { label: 'Payment', value: renderLink(`/storefront-data/payment/${refund.payment.id}`, refund.payment.transaction_reference), },
      { label: 'Student', value: renderLink(`/storefront-data/student/${refund.profile.id}`, `${refund.profile.first_name} ${refund.profile.last_name}`), },
      { label: 'Order', value: renderLink(`/storefront-data/order/${refund.cart_id}`, refund.cart_id), },
      // { label: 'Product', value: renderLink(`/store/product/${refund.product.id}`, refund.product.title), },
      { label: 'Product', value: refund.product.title, },
      { label: 'Paid Amount', value: refund.paid_amount, },
      { label: 'Refund Amount', value: refund.amount, },
      { label: 'Refund Status', value: refund.status, },
      {
        label: 'Cancel Enrollment',
        value: refund.task_cancel_enrollment,
        render: (text) => (text === "failed" || text === "not_required") ? <ContextAction type="start" tooltip="Start Cancel Enrollment Process" text={text} onClick={cancelEnrollment} refreshEventName={REFRESH_PAGE} buttonType={'primary'} /> : text,
      },
      // { label: 'Tax Refund', value: refund.task_tax_refund, render: (text) => <ContextAction type="start" tooltip="Start Update Tax Record Process" text={text} onClick={updateTaxRecord} refreshEventName={REFRESH_PAGE} /> },
      // { label: 'CRM Update', value: refund.task_crm_update, render: (text) => <ContextAction type="start" tooltip="Start Send Info to CRM Process" text={text} onClick={sendInfoToCRM} refreshEventName={REFRESH_PAGE} /> },
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
      helpKey: "refundSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: refund.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Refund: ${refund.id}`,
    tabs: tabMetas
  }
}
