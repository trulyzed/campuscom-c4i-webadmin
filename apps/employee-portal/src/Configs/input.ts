import { IField } from "@packages/components/lib/Form/common"

export const IMAGE_INPUT_FORMAT = '.jpg, .jpeg, .png'
export const BATCH_FILE_INPUT_FORMAT = '.csv'
export const FILE_INPUT_FORMAT = '.js'

type InputOption = 'ACTIVE_STATUS'

export const INPUT_OPTIONS: Record<InputOption, IField['options']> = {
  ACTIVE_STATUS: [
    { value: 'True', label: 'Active' },
    { value: 'False', label: 'Inactive' },
  ],
}