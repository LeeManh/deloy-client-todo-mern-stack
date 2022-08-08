import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

//components
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  //state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);

  //context
  const { registerUser } = useContext(AuthContext);

  //check can submit
  const canSubmit = Object.entries(registerForm).every(([key, value]) =>
    Boolean(value)
  );

  //handle change form
  const onFormChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  //handle submit
  const onRegister = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    if (registerForm.password !== registerForm.confirmPassword) {
      setAlert({
        type: "danger",
        message: "Confirmation password is not the same",
      });

      setTimeout(() => {
        setAlert(null);
      }, 2000);

      return;
    }

    const registerData = await registerUser({
      username: registerForm.username,
      password: registerForm.password,
    });

    if (!registerData.success) {
      setAlert({ type: "danger", message: registerData.message });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col sm="12" md="10" lg="6" className="mt-5">
          <h2 className="mb-3 ">Register</h2>

          <AlertMessage infor={alert} />

          <Form onSubmit={onRegister}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                name="username"
                value={registerForm.username}
                onChange={onFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                name="password"
                value={registerForm.password}
                onChange={onFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={onFormChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!canSubmit}>
              Register
            </Button>
          </Form>

          <div className="mt-5">
            <span>Already have account ? </span>
            <Link to="/login">Login</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
