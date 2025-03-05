import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand href="#" className="d-flex align-items-center">
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
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Upload & Analyze</Nav.Link>
          <Nav.Link href="#">Reports</Nav.Link>
        </Nav>
        <Form className="d-flex ms-3">
          <FormControl type="search" placeholder="Search in site" className="me-2" />
          <button className="btn btn-outline-secondary">
            <FaSearch />
          </button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
