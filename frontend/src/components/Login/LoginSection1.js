import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const LoginSection1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        console.log("Login response:", response.data); // Debug

        if (response.data && response.data.user && response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          navigate("/login-success");
        } else {
          console.error("Login failed: No user data received");
          setErrors({ api: "Invalid response from server" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ api: "Login failed. Please try again." });
      }
    }
  };


  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={5} className="text-md-start text-center mb-4 mb-md-0">
            <h1 className="fw-bold">User Login</h1>
            <p className="text-muted">Enter your email and password</p>
          </Col>
          <Col md={5}>
            <Card className="p-4 shadow-sm border-0">
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                {errors.api && (
                  <div className="text-danger mb-3">{errors.api}</div>
                )}
                <Button variant="dark" type="submit" className="w-100">
                  Log In
                </Button>
                <div className="text-center mt-3">
                  <Link to="#" className="text-muted">
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center mt-2">
                  <span className="text-muted">OR</span>
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
