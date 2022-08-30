import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderAmount, renderBoolean, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { getTransactionBatchRevenueSummary, PaymentFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/PaymentFormMeta"
import { getTransactionListTableColumns } from "~/TableSearchMeta/TransactionBatchCreate/TransactionListTableColumns"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"

export const getTransactionBatchDetailsMeta = (transactionBatch: { [key: string]: any }): IDetailsMeta => {
  const { revenueAmount, totalChequeAmount } = getTransactionBatchRevenueSummary(transactionBatch.totals?.net_payment_received, transactionBatch.payment_info?.revenue_percentage)

  const makePayment = QueryConstructor(((data) => TransactionBatchQueries.update({ ...data, params: { id: transactionBatch.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [TransactionBatchQueries.update])

  const summaryInfo: CardContainer = {
    title: `Settlement Batch: ${transactionBatch.batch_ref}`,
    cardActions: transactionBatch.status === "unpaid" ? [
      <MetaDrivenFormModalOpenButton
        formTitle={`Make Payment`}
        formMeta={PaymentFormMeta}
        formSubmitApi={makePayment}
        displayFieldValue={{
          batch_id: transactionBatch.batch_ref,
          total_net_payment_received: transactionBatch.totals?.net_payment_received,
          total_transactions: transactionBatch.total_transactions,
        }}
        buttonLabel={`Make Payment`}
        iconType="makePayment"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        type="download"
        tooltip="Download Settlement Batch"
        queryService={QueryConstructor((params) => TransactionBatchQueries.download({ ...params, params: { transaction_batch: transactionBatch.id } }), [TransactionBatchQueries.download])}
      />,
      <ContextAction
        type="delete"
        tooltip="Delete Settlement Batch"
        queryService={QueryConstructor(() => TransactionBatchQueries.delete({ data: { ids: [transactionBatch.id] } }), [TransactionBatchQueries.delete])}
        redirectTo={`/storefront-data/settlement-batch?page=1`}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ] : [],
    contents: [
      { label: 'Status', value: transactionBatch.status, render: (text) => renderBoolean(text === "paid", { truthyText: "Paid", falsyText: "Unpaid", uncolorize: true, tagColor: text === "paid" ? "#4B8400" : "#AAAAAA" }) },
      { label: 'Course Provider', value: transactionBatch.filter_params?.course_provider ? renderLink(`/administration/course-provider/${transactionBatch.filter_params.course_provider.id}`, transactionBatch.filter_params.course_provider.name) : undefined },
      { label: 'Store', value: transactionBatch.filter_params?.store ? renderLink(`/administration/store/${transactionBatch.filter_params.store.id}`, transactionBatch.filter_params.store.name) : undefined },
      { label: 'End Date', value: transactionBatch.filter_params?.end_date, render: renderDateTime },
      { label: 'Total Transactions', value: transactionBatch.total_transactions },
      { label: 'Total Gross Order Amount', value: transactionBatch.totals?.gross_order_amount, render: renderAmount },
      { label: 'Total Discount', value: transactionBatch.totals?.discount, render: renderAmount },
      { label: 'Total Net Order Amount', value: transactionBatch.totals?.net_order_amount, render: renderAmount },
      { label: 'Total Card Fees', value: transactionBatch.totals?.card_fees, render: renderAmount },
      { label: 'Total Net Payment Received', value: transactionBatch.totals?.net_payment_received, render: renderAmount },
    ]
  }

  const paymentInfo: CardContainer | undefined = (transactionBatch.status === "paid") ? {
    title: `Payment Information`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Edit Payment`}
        formMeta={PaymentFormMeta}
        formSubmitApi={makePayment}
        initialFormValue={{
          payment_ref: transactionBatch.payment_info?.ref,
          payment_note: transactionBatch.payment_info?.note,
          payment_date: transactionBatch.payment_date,
          revenue_percentage: transactionBatch.payment_info?.revenue_percentage,
        }}
        displayFieldValue={{
          batch_id: transactionBatch.batch_ref,
          total_net_payment_received: transactionBatch.totals?.net_payment_received,
          revenue_amount: revenueAmount,
          cheque_amount: totalChequeAmount,
          total_transactions: transactionBatch.total_transactions,
        }}
        buttonLabel={`Edit Payment`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Payment Reference', value: transactionBatch.payment_info?.ref },
      { label: 'Payment Note', value: transactionBatch.payment_info?.note },
      { label: 'Payment Date', value: transactionBatch.payment_date, render: renderDateTime },
      { label: 'Total Transactions', value: transactionBatch.total_transactions },
      { label: 'Total Net Payment Received', value: transactionBatch.totals?.net_payment_received, render: renderAmount },
      { label: 'Revenue Percentage', value: `${transactionBatch.payment_info?.revenue_percentage}%`, },
      { label: 'Revenue Amount (Calculated)', value: revenueAmount, render: renderAmount },
      { label: 'Cheque Amount', value: totalChequeAmount, render: renderAmount },
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
      tabTitle: "Transactions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getTransactionListTableColumns(),
          searchFunc: QueryConstructor(
            (params) => TransactionQueries.getList(params).then(resp => resp.success ? ({ ...resp, data: resp.data.list }) : resp),
            [TransactionQueries.getList]
          ),
          searchParams: { transaction_batch: transactionBatch.id },
        }
      },
      helpKey: "transactionsTab"
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
    pageTitle: `Settlement Batch Title - ${transactionBatch.batch_ref}`,
    tabs: tabMetas
  }
}
