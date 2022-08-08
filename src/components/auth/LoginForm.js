import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

//components
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  //context
  const { loginUser } = useContext(AuthContext);

  //state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const [alert, setAlert] = useState(null);

  //check
  const canSubmit = [username, password].every(Boolean);

  //handle
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  //
  const onLogin = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const loginData = await loginUser({ username, password });

    if (!loginData.success) {
      setAlert({ type: "danger", message: loginData.message });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
    console.log(loginData);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="12" md="10" lg="6" className="mt-5">
          <h2 className="mb-3 ">Login</h2>

          <AlertMessage infor={alert} />

          <Form onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                name="username"
                value={username}
                onChange={onChangeLoginForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={onChangeLoginForm}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!canSubmit}>
              Login
            </Button>
          </Form>

          <div className="mt-5">
            <span>Dont have account ? </span>
            <Link to="/register">Register</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
