import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { PaymentFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/PaymentFormMeta"

export const getTransactionBatchDetailsMeta = (transactionBatch: { [key: string]: any }): IDetailsMeta => {
  const makePayment = QueryConstructor(((data) => TransactionBatchQueries.update({ ...data, params: { id: transactionBatch.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [TransactionBatchQueries.update])

  const summaryInfo: CardContainer = {
    title: `Transaction Batch: ${transactionBatch.name}`,
    cardActions: transactionBatch.status === "unpaid" ? [
      <MetaDrivenFormModalOpenButton
        formTitle={`Make Payment`}
        formMeta={PaymentFormMeta}
        formSubmitApi={makePayment}
        buttonLabel={`Make Payment`}
        iconType="makePayment"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        type="download"
        tooltip="Download Transaction Batch"
        queryService={QueryConstructor((params) => TransactionBatchQueries.download({ ...params, params: { transaction_batch: transactionBatch.id } }), [TransactionBatchQueries.download])}
      />,
      <ContextAction
        type="delete"
        tooltip="Delete Transaction Batch"
        queryService={QueryConstructor(() => TransactionBatchQueries.delete({ data: { id: [transactionBatch.id] } }), [TransactionBatchQueries.delete])}
        refreshEventName={REFRESH_PAGE}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ] : [],
    contents: [
      { label: 'Batch Name', value: transactionBatch.name, render: (text: any) => text },
      { label: 'Start Date', value: transactionBatch.start_date, render: renderDateTime },
      { label: 'End Date', value: transactionBatch.end_date, render: renderDateTime },
      { label: 'Status', value: transactionBatch.status },
    ]
  }

  const paymentInfo: CardContainer | undefined = (transactionBatch.status === "paid") ? {
    title: `Payment: ${transactionBatch.payment_ref}`,
    contents: [
      { label: 'Payment Ref', value: transactionBatch.payment_info?.ref },
      { label: 'Payment Note', value: transactionBatch.payment_info?.note },
      { label: 'Payment Date', value: transactionBatch.payment_date, render: renderDateTime },
    ]
  } : undefined

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo, ...paymentInfo ? [paymentInfo] : []]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "transactionBatchSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: transactionBatch.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Transaction Batch Title - ${transactionBatch.name}`,
    tabs: tabMetas
  }
}
