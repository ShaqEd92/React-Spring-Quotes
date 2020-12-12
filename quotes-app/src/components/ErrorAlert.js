import React from "react";

const ErrorAlert = ({ message, onClose }) => (
  <div>
    <button onClick={onClose}>X</button>
    <p>{message}</p>
  </div>
);

export default ErrorAlert;
