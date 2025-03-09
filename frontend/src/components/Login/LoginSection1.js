import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginSection1 = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <Container>
        <Row className="justify-content-center align-items-center">
          {/* Cột chứa tiêu đề */}
          <Col md={5} className="text-md-start text-center mb-4 mb-md-0">
            <h1 className="fw-bold">User Login</h1>
            <p className="text-muted">Enter your email and password</p>
          </Col>

          {/* Cột chứa form đăng nhập */}
          <Col md={5}>
            <Card className="p-4 shadow-sm border-0">
              <Form>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <Button variant="dark" className="w-100">
                  Log In
                </Button>
                <div className="text-center mt-3">
                  <Link to="#" className="text-muted">
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center mt-2">
                  <Link to="/register" className="text-muted">
                    Create Account
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginSection1;
