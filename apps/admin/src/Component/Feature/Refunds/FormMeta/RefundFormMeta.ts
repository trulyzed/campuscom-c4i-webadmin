import { IField, NUMBER, TEXTAREA, BOOLEAN } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getRefundFormMeta = (): IField[] => [
  {
    label: 'Refund Amount',
    fieldName: 'amount',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Refund Reason',
    fieldName: 'note',
    inputType: TEXTAREA,
  },
  {
    label: 'Cancel the enrollment',
    fieldName: 'task_cancel_enrollment',
    inputType: BOOLEAN,
  }
]
