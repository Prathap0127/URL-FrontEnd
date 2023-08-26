import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TopBar = ({ userEmail }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  // console.log(userEmail)

  const logoutOnClick = () => {
    removeCookie("token");
    navigate("/signIn");
    toast.success("User Logged Out");
    setIsLoggedIn(false);
  };

  return (
    <div className="appbar">
      <Navbar
        key={"lg"}
        expand="lg"
        className="bg-body-tertiary mb-0"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h2 className="text-center">URls Shortner</h2>
          </Navbar.Brand>
          <Navbar.Text>
            Welcome, <b>{userEmail}</b>
          </Navbar.Text>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">
                  <Button className="btn btn-primary btn-login text-uppercase fw-bold">
                    Home
                  </Button>
                </Nav.Link>

                {isLoggedIn ? (
                  <Nav.Link onClick={() => logoutOnClick()}>
                    <Button className="btn btn-primary btn-login text-uppercase fw-bold">
                      Logout
                    </Button>
                  </Nav.Link>
                ) : (
                  ""
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopBar;
