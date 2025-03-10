import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessLogin = () => {
  const navigate = useNavigate();

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Container className="text-center">
        <Row>
          <Col>
            <h2 className="fw-bold text-success">Login Successful!</h2>
            <p className="text-muted">You have successfully logged in.</p>
            <Button variant="dark" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SuccessLogin;
