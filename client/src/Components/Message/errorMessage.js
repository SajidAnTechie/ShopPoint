import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import "animate.css";

const ErrorMessage = ({ header, message }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div style={{ position: "fixed", right: "0", zIndex: "20180210" }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="animate__animated animate__shakeX"
        >
          <Toast.Header
            style={{ background: "red", color: "white", fontWeight: "bold" }}
          >
            <strong className="mr-auto">{header}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default ErrorMessage;
