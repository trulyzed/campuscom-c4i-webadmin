interface ISessionDescriptionProps {
  isRecording: boolean
}

export const SessionDescription = ({ isRecording }: ISessionDescriptionProps) => {
  return (
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
  )
}