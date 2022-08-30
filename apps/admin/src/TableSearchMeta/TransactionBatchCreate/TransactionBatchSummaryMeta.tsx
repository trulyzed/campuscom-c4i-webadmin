import { IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { getDecimalValue } from "@packages/utilities/lib/util"

export const getTransactionBatchSummaryMeta = (summary: any): IDetailsSummary["summary"] => {
  return [
    {
      title: `Transaction Summary`,
      style: { borderBottom: 0 },
      contents: [
        { label: 'Total Gross Order Amount', value: `$${getDecimalValue(summary.gross_order_amount)}` },
        { label: 'Total discount', value: `$${getDecimalValue(summary.discount)}` },
        { label: 'Total Net Order Amount', value: `$${getDecimalValue(summary.net_order_amount)}` },
        { label: 'Total Card Fees', value: `$${getDecimalValue(summary.card_fees)}` },
      ],
      colSpan: 24
    },
  ]
}

export const getTransactionBatchEmphasizedSummaryMeta = (summary: any): IDetailsSummary["summary"] => {
  return [
    {
      contents: [
        { label: 'Total Net Payment Received', value: `$${getDecimalValue(summary.net_payment_received)}`, emphasize: true, },
      ],
      style: { borderTop: 0, marginTop: "-40px" },
      colSpan: 24
    },
  ]
}