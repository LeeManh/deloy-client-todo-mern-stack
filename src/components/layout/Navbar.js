import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

//conponents
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const NavbarMenu = () => {
  //context
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand>
          <img
            src="./assets/icons/logo-100.png"
            alt=""
            style={{ width: "60px", height: "60px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/dashboard" as={Link}>
              Dash Board
            </Nav.Link>
            <Nav.Link to="/about" as={Link}>
              About
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center js">
            <p style={{ margin: 0, marginRight: "5px" }}>
              Welcome {user.username}
            </p>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Logout</Tooltip>}
            >
              <img
                src="./assets/icons/log-out-50.png"
                alt="img"
                onClick={() => logoutUser()}
                style={{ cursor: "pointer" }}
              />
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
