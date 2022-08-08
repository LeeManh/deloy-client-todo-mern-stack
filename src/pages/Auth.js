import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

//components
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Spinner from "react-bootstrap/Spinner";

const Container = styled.div`
  background-image: url("https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  color: white;
  display: grid;
  place-items: center;

  a {
    font-weight: 700;
  }
`;

const Auth = ({ authRoute }) => {
  const { authState } = useContext(AuthContext);

  if (authState.authLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (authState.isAuthenticated) return <Navigate replace to="/dashboard" />;

  const body = authRoute === "login" ? <LoginForm /> : <RegisterForm />;

  return <Container>{body}</Container>;
};

export default Auth;
