import { Space } from "antd"
import { useState } from "react"
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard"
import { ContextAction } from "./ContextAction"

export const CopyToClipboard = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <Space size={"small"} >
      <span>{text}</span>
      <ReactCopyToClipboard text={text} children={<ContextAction tooltip="Copy to clipboard" type="copy" iconColor={isCopied ? "success" : undefined} />} onCopy={() => setIsCopied(true)} />
    </Space>
  )
}