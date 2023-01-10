import { useCallback, useContext, useEffect, useState } from "react"
import { Button, Divider } from "antd"
import Tracker from '@openreplay/tracker'
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ModalWrapper } from "@packages/components/lib/Modal/ModalWrapper"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { renderCopyToClipboard } from "@packages/components/lib/ResponsiveTable"
import { generateUUID } from "@packages/utilities/lib/UUID"

const tracker = new Tracker({
  projectKey: process.env.REACT_APP_OPEN_REPLAY_PRIVATE_KEY!,
})

export const RecordSession = () => {
  const [showModal, setShowModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingID, setRecordingID] = useState<string>()
  const { userData } = useContext(UserDataContext)

  const handleStart = useCallback(async () => {
    if (isProcessing) return
    setRecordingID(undefined)
    const id = generateUUID()

    try {
      setIsProcessing(true)
      await tracker.start({
        metadata: {
          recording_id: id
        }
      })
      setIsRecording(true)
      setRecordingID(id)
    } catch (error) {
      setIsRecording(false)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing])

  const handleStop = useCallback(() => {
    tracker.stop()
    setIsRecording(false)
  }, [])

  useEffect(() => {
    if (!userData) return
    tracker.setUserID(userData.email)
    tracker.setMetadata('user_fullname', userData.fullname)
    return () => { tracker.stop() }
  }, [userData])

  useEffect(() => {
    if (isRecording) setShowModal(false)
  }, [isRecording])

  return (
    <>
      <ContextAction
        type="record"
        tooltip={isRecording ? "Recording..." : "Record a session"}
        onClick={() => setShowModal(true)}
        iconColor={isRecording ? 'danger' : undefined}
      />
      {showModal ? (
        <ModalWrapper
          title={isRecording ? "Recording a Session" : "Record Session"}
          actions={[
            isRecording ?
              <Button type="primary" onClick={handleStop}>Stop</Button>
              : <Button type="primary" onClick={handleStart}>Start</Button>,
            <Button onClick={() => setShowModal(false)}>Close</Button>,
          ]}
          onClose={() => setShowModal(false)}
          focusOnClose>
          {(!isRecording && recordingID) ?
            <div className="mb-10">
              <strong>Recording ID: </strong>
              <div>
                {renderCopyToClipboard(recordingID, { successMessage: 'Copied to clipboard', title: recordingID })}
              </div>
              <Divider />
            </div>
            : null
          }
          <div>
            {isRecording ?
              <span>
                <p>A record is in progress. Click <strong>Stop</strong> button to end the recording.</p>
              </span>
              : <span>
                <p>Begin a new recording session by clicking the <strong>Start</strong> button.</p>
              </span>
            }
          </div>
        </ModalWrapper>
      ) : null}
    </>
  )
}