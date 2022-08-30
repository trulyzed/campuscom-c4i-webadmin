import { IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"

export const getTransactionBatchSummaryMeta = (summary: any): IDetailsSummary["summary"] => {
  return [
    {
      title: `Transaction Summary`,
      style: { borderBottom: 0 },
      contents: [
        { label: 'Total Gross Order Amount', value: summary.gross_order_amount, render: renderAmount },
        { label: 'Total discount', value: summary.discount, render: renderAmount },
        { label: 'Total Net Order Amount', value: summary.net_order_amount, render: renderAmount },
        { label: 'Total Card Fees', value: summary.card_fees, render: renderAmount },
      ],
      colSpan: 24
    },
  ]
}

export const getTransactionBatchEmphasizedSummaryMeta = (summary: any): IDetailsSummary["summary"] => {
  return [
    {
      contents: [
        { label: 'Total Net Payment Received', value: summary.net_payment_received, render: renderAmount, emphasize: true, },
      ],
      style: { borderTop: 0, marginTop: "-40px" },
      colSpan: 24
    },
  ]
}