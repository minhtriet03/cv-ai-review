import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setError("");
    } catch (err) {
      setError(err.response.data.message);
      setMessage("");
    }
  };


  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Forgot Password?</h2>
      <p>
        Enter your email address below and we'll send you a link to reset your
        password.
      </p>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3 w-100">
          Send Reset Link
        </Button>
      </Form>

      <div className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
        <Link to="/login" className="text-muted">
          Back to Login
        </Link>
      </div>
    </Container>
  );
};

export default ForgotPassword;
