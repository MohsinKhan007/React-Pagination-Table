import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
export const AlertMsg = (message: string, type: string) => {
  const [, setShow] = useState(true)
  return (
    <Alert
      onClose={() => setShow(false)}
      data-testid="alertMsg"
      className="alert-custom"
      variant={type}
      dismissible
    >
      {message}
    </Alert>
  )
}
