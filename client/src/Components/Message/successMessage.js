import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import 'animate.css';

const SuccessMessage = ({ header, message, reset }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ position: 'fixed', right: '0', zIndex: '20180210' }}>
        <Toast
          onClose={() => {
            setShow(false);
            dispatch({ type: reset });
          }}
          show={show}
          delay={3000}
          autohide
          className="animate__animated animate__shakeX"
        >
          <Toast.Header
            style={{
              background: '#43BE31',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <strong className="mr-auto">{header}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default SuccessMessage;
