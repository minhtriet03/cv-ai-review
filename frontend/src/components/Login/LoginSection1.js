import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { UserContext } from "../../UserContext";
import { message } from "antd";

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
      return;
    }
    console.log("password:",password);
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      },

    {
      withCredentials: true, 
    }
  );

      
      console.log("Login response:", response.data); // Debug
  
      if (response.data?.user) {
        if (response.data.user.isBlocked) {
          setErrors({ api: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm chi tiết." });
          return;
        }
      }
      if (response.data?.user ) {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("loginSuccess", "1");
        if(response.data.user.role === "user"){
          navigate("/");
          message.success("Bạn đã đăng nhập thành công!");
        }
        setUser(response.data.user);
        
      } else {
        setErrors({ api: "Phản hồi từ máy chủ không hợp lệ." });
        console.log(error);
      }
    } catch (error) {
      console.error("Login failed:", error);
  
      if (error.response) {
        const { status, data } = error.response;
        
        // Xử lý theo mã lỗi từ backend
        if (status === 400) {
          setErrors({ api: "Invalid request. Please check your input." });
        } else if (status === 401) {
          setErrors({ api: "Incorrect password." });
        } else if (status === 404) {
          setErrors({ api: "User not found." });
        } else if (status === 500) {
          setErrors({ api: "Server error. Please try again later." });
        } else if (status === 403) {
          setErrors({ api: "Account not verified with OTP. Please register again." });
        } else {
          setErrors({ api: data?.message || "An unknown error occurred." });
        }
      } else {
        setErrors({ api: "Can not connect to server. Please check your network!." });
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
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }} className="text-muted">
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center mt-2">
                  <span className="text-muted">OR</span>
                </div>
                <div className="text-center mt-2">
                  <Link to="/register" style={{ textDecoration: 'none' }} className="text-muted">
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
