import { notification, Space } from "antd"
import { ReactNode, useCallback, useState } from "react"
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard"
import { ContextAction } from "./ContextAction"

export const CopyToClipboard = ({ content, title, successMessage }: { content: string; title?: ReactNode; successMessage?: string; }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    setIsCopied(true)
    if (successMessage) notification.success({ message: successMessage })
  }, [successMessage])

  return (
    <Space size={"small"}>
      {(title && typeof title !== "string") ? title : <span>{title || content}</span>}
      <ReactCopyToClipboard text={content} children={<ContextAction tooltip="Copy to clipboard" type="copy" iconColor={isCopied ? "success" : undefined} />} onCopy={handleCopy} />
    </Space>
  )
}