import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        ></div>
        <span className="fw-bold">AI-Powered CV Analysis</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/upload">
            Upload & Analyze
          </Nav.Link>
          <Nav.Link as={Link} to="/reports">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login/Signup
          </Nav.Link>
        </Nav>
        <Form className="d-flex ms-3">
          <FormControl
            type="search"
            placeholder="Search in site"
            className="me-2"
            style={{ borderRadius: "20px" }}
          />
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <FaSearch />
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
