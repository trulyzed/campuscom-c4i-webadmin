import { IField } from "@packages/components/lib/Form/common"

export const IMAGE_INPUT_FORMAT = '.jpg, .jpeg, .png'
export const BATCH_FILE_INPUT_FORMAT = '.csv'
export const FILE_INPUT_FORMAT = '.js'

type InputOption = 'ACTIVE_STATUS' | 'DISCOUNT_RULE_CONTEXT_TYPE' | 'DISCOUNT_RULE_OPERATOR_TYPE' | 'EXECUTION_MODE' | 'MEMBERSHIP_TYPE' | 'PRODUCT_TYPE' | 'QUESTION_TYPE'

export const INPUT_OPTIONS: Record<InputOption, IField['options']> = {
  ACTIVE_STATUS: [
    { value: 'True', label: 'Active' },
    { value: 'False', label: 'Inactive' },
  ],
  DISCOUNT_RULE_CONTEXT_TYPE: [
    { value: 'product', label: 'Product' },
  ],
  DISCOUNT_RULE_OPERATOR_TYPE: [
    { value: 'in', label: 'in' },
  ],
  EXECUTION_MODE: [
    { value: 'self-paced', label: 'Self-paced' },
    { value: 'instructor-led', label: 'Instructor led' }
  ],
  MEMBERSHIP_TYPE: [
    { value: 'time_based',label: 'Time Based' },
    { value: 'date_based',label: 'Date Based' },
  ],
  PRODUCT_TYPE: [
    { value: 'section',label: 'Section', },
    { value: 'certificate',label: 'Certificate', },
    { value: 'membership',label: 'Membership', },
    { value: 'miscellaneous',label: 'Miscellaneous', },
  ],
  QUESTION_TYPE: [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'date', label: 'Date' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'toggle', label: 'Toggle' },
    { value: 'select', label: 'Select' },
    { value: 'attachment', label: 'Attachment' },
    { value: 'signature', label: 'Signature' },
    // { value: 'composite', label: 'Composite' },
  ]
}