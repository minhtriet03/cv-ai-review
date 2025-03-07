import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewSection = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <Container className="text-center">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <h1 className="fw-bold mb-4">Try Our AI Features</h1>
            <p className="lead mb-4">
              Let AI rewrite parts of your CV for you.</p>
            <Button as={Link} to="/features" variant="light" className="px-5">
              Try Now
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="path/to/your/new-image.jpg"
              alt="Features"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewSection;
