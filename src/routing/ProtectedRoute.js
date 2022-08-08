import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

//components
import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ children }) => {
  //context
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
