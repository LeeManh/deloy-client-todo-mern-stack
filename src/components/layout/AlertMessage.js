import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertMessage = ({ infor }) => {
  return (
    <>{!infor ? null : <Alert variant={infor.type}>{infor.message}</Alert>}</>
  );
};

export default AlertMessage;
