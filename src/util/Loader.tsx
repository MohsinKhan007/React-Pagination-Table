import { Spinner } from 'react-bootstrap'

export const Loader = () => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ flexDirection: 'column' }}
  >
    <Spinner
      animation="border"
      variant="primary"
      size="sm"
      style={{
        width: '10rem',
        height: '10rem',
        marginTop: '2rem',
        fontSize: '3rem',
      }}
      role="string"
    />
    <span style={{ fontWeight: '700', fontSize: '1.3rem' }}>
      Loading...
    </span>
  </div>
)
