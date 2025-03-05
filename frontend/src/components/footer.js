import React from "react";
import { Container, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light shadow-sm py-3">
      <Container className="d-flex justify-content-between align-items-center px-4">
        <small className="text-muted">
          © 2021 AI CV Review Tool. All rights reserved.
        </small>
        <Nav>
          <Nav.Link href="#" className="text-muted">
            Privacy Policy
          </Nav.Link>
          <Nav.Link href="#" className="text-muted ms-3">
            Terms of Service
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
};

export default Footer;
