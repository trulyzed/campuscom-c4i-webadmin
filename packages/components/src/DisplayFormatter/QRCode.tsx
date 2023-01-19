import ReactQRCode from "react-qr-code"

interface IQRCodeProps {
  value: string
  size?: number
}

export const QRCode = ({ value, size = 200 }: IQRCodeProps) => {
  return typeof value === "string" ? (
    <ReactQRCode value={value} size={size} />
  ) : null
}