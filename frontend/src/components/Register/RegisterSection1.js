import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const SignupSection = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center align-items-center">
          {/* Cột chứa tiêu đề */}
          <Col md={5} className="text-md-start text-center mb-4 mb-md-0">
            <h1 className="fw-bold">Create an Account</h1>
            <p className="text-muted">Sign up to get started</p>
          </Col>

          {/* Cột chứa form đăng ký */}
          <Col md={5}>
            <Card className="p-4 shadow-sm border-0">
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                  />
                </Form.Group>

                <Button variant="dark" className="w-100 mb-3">
                  Sign Up
                </Button>

                <div className="text-center">
                  <p className="text-muted">Or sign up with</p>
                  <Button
                    variant="outline-dark"
                    className="w-100 mb-2 d-flex align-items-center justify-content-center"
                  >
                    <FaGoogle className="me-2" /> Sign Up with Google
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="w-100 mb-2 d-flex align-items-center justify-content-center"
                  >
                    <FaFacebook className="me-2" /> Sign Up with Facebook
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaTwitter className="me-2" /> Sign Up with Twitter
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignupSection;
