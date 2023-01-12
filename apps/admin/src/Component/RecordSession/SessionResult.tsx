import { Divider } from "antd"
import { renderCopyToClipboard } from "@packages/components/lib/ResponsiveTable"

interface ISessionResultProps {
  isRecording: boolean
  recordingID?: string
}

export const SessionResult = ({
  isRecording,
  recordingID
}: ISessionResultProps) => {
  return !isRecording && recordingID ? (
    <div className="mb-10">
      <strong>Recording ID: </strong>
      <div>
        {renderCopyToClipboard(recordingID, { successMessage: 'Copied to clipboard', title: recordingID })}
      </div>
      <Divider />
    </div>
  ) : null
}