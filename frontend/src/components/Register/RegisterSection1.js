import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignupSection = () => {
  const [step, setStep] = useState("signup");
  const navigate = useNavigate(); // "signup" | "otp"
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      return setError("Vui lòng nhập đầy đủ thông tin!");
    }
  
    try {
      const user = { name, email, password }; // Gửi toàn bộ user object
      const response = await axios.post("http://localhost:5000/api/register", user,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        console.log("OTP sent to:", email); 
        setStep("otp");
        setError("");
      }
      if (response.status === 400){
        setError("email đã tồn tại !");
      }
    } catch (error) {

      setError(error.response?.data?.message || "Lỗi kiểm tra email!");
    }
  };
  
  const handleVerifyOtp = async () => {
    console.log("📩 Đang gửi OTP:", { email, otp }); // ✅ Log trước khi gửi

    if (!otp) {
        console.warn("⚠️ Vui lòng nhập OTP!");
        return setError("Vui lòng nhập OTP!");
    }

    try {
        const response = await axios.post(
            "http://localhost:5000/api/verify-email",
            { email, otp},
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("📥 Phản hồi từ server:", response.data); // ✅ Log phản hồi server

        if (response.status === 200) {
            console.log("✅ Tài khoản đăng ký thành công!");
            navigate("/login"); // Chuyển hướng đến trang đăng nhập
            setError("");
        }
    } catch (error) {
        console.error("❌ Lỗi khi xác thực OTP:", error.response?.data?.message || error.message);

        if (error.response?.status === 400) {
            setError("Sai OTP!");
        } else {
            setError(error.response?.data?.message || "Lỗi kiểm tra email!");
        }
    }
};


  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={5} className="text-md-start text-center mb-4 mb-md-0">
            <h1 className="fw-bold">Create an Account</h1>
            <p className="text-muted">Sign up to get started</p>
          </Col>

          <Col md={5}>
            <Card className="p-4 shadow-sm border-0">
              {step === "signup" ? (
                <Form>
                      <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your full name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
              </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                       <Form.Label>Password</Form.Label>
                       <Form.Control 
                         type="password" 
                         placeholder="Create a password" 
                         value={password} 
                         onChange={(e) => setPassword(e.target.value)} 
                       />
                  </Form.Group>
                  {error && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{error}</p>}
                  <Button variant="dark" className="w-100 mb-3" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="formOtp" className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  </Form.Group>

                  <Button variant="success" className="w-100 mb-3" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignupSection;
