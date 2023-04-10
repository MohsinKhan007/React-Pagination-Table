import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

type AlertMsgProps = {
  message: string
  type: string
}

export const AlertMsg = ({ message, type }: AlertMsgProps) => {
  const [show, setShow] = useState(true)
  console.log('message in Alert Props', message)
  if (show) {
    return (
      <Alert
        onClose={() => setShow(false)}
        className="alert-custom"
        variant={type}
        dismissible
      >
        {message}
      </Alert>
    )
  }
  return null
}
