import { useCallback, useContext, useEffect, useState } from "react"
import { Button, Divider, Form, notification } from "antd"
import Tracker from '@openreplay/tracker'
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ModalWrapper } from "@packages/components/lib/Modal/ModalWrapper"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { renderCopyToClipboard } from "@packages/components/lib/ResponsiveTable"
import { FormFields } from "@packages/components/lib/Form/MetaDrivenForm"
import { TEXTAREA } from "@packages/components/lib/Form/common"

const tracker = new Tracker({
  projectKey: process.env.REACT_APP_OPEN_REPLAY_PRIVATE_KEY!,
})

export const RecordSession = () => {
  const [showModal, setShowModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingID, setRecordingID] = useState<string>()
  const { userData } = useContext(UserDataContext)
  const [formInstance] = Form.useForm()
  const { resetFields, getFieldsValue } = formInstance

  const handleStart = useCallback(async () => {
    if (isProcessing || !userData) return
    setRecordingID(undefined)

    const { remarks } = getFieldsValue()
    const id = `${Date.now()}`

    try {
      setIsProcessing(true)
      await tracker.start({
        metadata: {
          recording_id: id,
          ...remarks && { remarks }
        },
        forceNew: true,
        userID: userData.email,
      })
      setIsRecording(true)
      setRecordingID(id)
      notification.success({ message: 'Recording started.' })
    } catch (error) {
      setIsRecording(false)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, userData, getFieldsValue])

  const handleStop = useCallback(() => {
    tracker.stop()
    setIsRecording(false)
    notification.success({ message: 'Recording stopped.' })
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

  useEffect(() => {
    resetFields()
  }, [showModal, resetFields])

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
          {!isRecording ?
            <Form form={formInstance}>
              <FormFields
                formInstance={formInstance}
                meta={[
                  {
                    label: 'Remarks',
                    inputType: TEXTAREA,
                    fieldName: 'remarks',
                    colSpan: 12
                  }
                ]}
                dependencyValue={{}}
                isVertical
              />
            </Form>
            : null}
        </ModalWrapper>
      ) : null}
    </>
  )
}