import React from "react";
import { Container, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="shadow-sm py-3 mt-auto" style={{ background: "#f2f4f7" }}>
      <Container className="d-flex justify-content-between align-items-center px-4 ">
        <small className="text-muted">
          © 2025 AI CV Review Tool. All rights reserved.
        </small>
        <Nav>
          <Nav.Link href="/term-privacy" className="text-muted">
            Terms & Privacy Policy
          </Nav.Link>
          <Nav.Link href="#" className="text-muted ms-3">
            Created by MinhTriet & PhuGia
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
};
export default Footer;
