import { IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"

export const getTransactionBatchSummaryMeta = (summary: any): IDetailsSummary["summary"] => {
  return [
    {
      title: `Transaction Summary`,
      contents: [
        { label: 'Total Gross Order Amount', value: summary.gross_order_amount },
        { label: 'Total discount', value: summary.discount },
        { label: 'Total Net Order Amount', value: summary.net_order_amount },
        { label: 'Total Card Fees', value: summary.card_fees },
        { label: 'Total Net Payment Received', value: summary.net_payment_received },
      ]
    }
  ]
}