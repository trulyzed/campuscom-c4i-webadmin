import { DISPLAY_FIELD, IField, OTP } from "@packages/components/lib/Form/common"
import { QRCode } from "@packages/components/lib/DisplayFormatter/QRCode"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getEnableMFAFormMeta = (): IField[] => [
  {
    label: "Scan QR",
    inputType: DISPLAY_FIELD,
    fieldName: "qr_code",
    helperText: "Please install Google Authenticator app in your phone. Open the app, scan the QR code to add this application. Then enter the verification code of the application below.",
    render: (text) => <QRCode value={text} size={200} />
  },
  {
    label: "Enter Code",
    inputType: OTP,
    fieldName: "otp",
    rules: [{ required: true, message: "This field is required!" }],
    otpLength: 6
  },
]
