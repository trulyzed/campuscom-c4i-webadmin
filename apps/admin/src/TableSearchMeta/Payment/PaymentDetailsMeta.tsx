import { IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getRefundFormMeta } from "~/Component/Feature/Refunds/FormMeta/RefundFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { RefundQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Refunds"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { notification } from "antd"

export const getPaymentDetailsMeta = (payment: { [key: string]: any }): IDetailsMeta => {
  const createEntity = QueryConstructor(((data) => RefundQueries.create({ ...data, data: { ...data?.data, payment: payment.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [RefundQueries.create])

  const summaryMeta: IDetailsSummary = {
    summary: [{
      title: `Payment: ${payment.transaction_request_id}`,
      contents: [
        { label: 'Store', value: payment.store.name, render: (text: any) => text },
        { label: 'Order ID', value: renderLink(`/storefront-data/order/${payment.cart.id}`, payment.cart.order_ref) },
        { label: 'Product', value: payment.product.title, render: (text: any) => text },
        { label: 'Store Payment Gateway', value: payment.store_payment_gateway?.name, render: (text: any) => text },
        { label: 'Amount', value: payment.amount },
        { label: 'Transaction Reference', value: payment.transaction_reference },
        { label: 'Status', value: payment.status },
        { label: 'Student', value: renderLink(`/storefront-data/student/${payment.profile.id}`, `${payment.profile.first_name} ${payment.profile.last_name}`) },
      ],
      cardActions: [
        <MetaDrivenFormModalOpenButton
          formTitle={`Create Refund request`}
          formMeta={getRefundFormMeta()}
          formSubmitApi={createEntity}
          buttonLabel={`Create Refund Request`}
          refreshEventName={REFRESH_PAGE}
          iconType={'pay'}
          iconColor={'warning'}
        />,
      ],
    }]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "paymentSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: payment.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Payment Title - ${payment.transaction_request_id}`,
    tabs: tabMetas
  }
}
