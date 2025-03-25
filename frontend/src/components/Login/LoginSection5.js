import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { LockFill } from "react-bootstrap-icons";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    try {
      const response = await resetPassword(token, newPassword);
      setMessage(response.message);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại!"
      );
      setMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={5}>
          <Card className="shadow-lg p-4 border-0 rounded-3">
            <div className="text-center mb-3">
              <LockFill size={40} className="text-primary" />
              <h3 className="fw-bold mt-2">Đặt lại mật khẩu</h3>
              <p className="text-muted">Nhập mật khẩu mới của bạn</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>
                  <strong>Mật khẩu mới</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {message && (
                <Alert variant="success" className="text-center">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold mt-2"
              >
                Xác nhận đặt lại
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
