import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const WelcomeSection = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <Container className="text-center">
        <h1 className="fw-bold">Join With Us</h1>
        <p className="text-muted">Log in to access your CV review</p>
        <Form className="d-flex flex-column align-items-center">
          <Form.Control
            type="email"
            placeholder="Your Email"
            className="w-50 mb-3 text-center"
          />
          <div className="d-flex gap-3">
            <Button variant="outline-dark" className="px-5">
              Sign Up
            </Button>
            <Button variant="dark" className="px-5">
              Log In
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default WelcomeSection;
