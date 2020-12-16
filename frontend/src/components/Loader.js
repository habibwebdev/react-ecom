import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div
      className="spinner-relative"
      style={{ position: 'relative', height: '80vh', widht: '100%' }}
    >
      <div
        className="spinner absolute"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default Loader
