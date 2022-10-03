import { notification, Space } from "antd"
import { useCallback, useState } from "react"
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard"
import { ContextAction } from "./ContextAction"

export const CopyToClipboard = ({ text, successMessage }: { text: string; successMessage?: string; }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    setIsCopied(true)
    if (successMessage) notification.success({ message: successMessage })
  }, [successMessage])

  return (
    <Space size={"small"}>
      <span>{text}</span>
      <ReactCopyToClipboard text={text} children={<ContextAction tooltip="Copy to clipboard" type="copy" iconColor={isCopied ? "success" : undefined} />} onCopy={handleCopy} />
    </Space>
  )
}