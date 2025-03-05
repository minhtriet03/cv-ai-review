import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SignupSection = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="bg-white p-5 shadow-sm rounded text-center">
            <h2 className="mb-4 fw-bold">Join Now for Free CV Analysis</h2>
            <Form>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                />
              </Form.Group>
              <Button variant="dark" className="w-100">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignupSection;
