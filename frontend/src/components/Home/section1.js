import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <Container fluid className="hero-section py-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-start">
          <h1 className="fw-bold">Instant CV Analysis with AI</h1>
          <a href="/upload">
            <Button variant="dark" className="mt-3">Get Started</Button>
          </a>
          {/* chỗ này thêm phương thức kiểm tra đăng nhập hay chưa */}
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <div className="placeholder-box"></div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;

// CSS styles (có thể đặt trong file CSS riêng)
// .hero-section { background-color: #fff; }
// .placeholder-box { width: 80%; height: 300px; background-color: #eee; border-radius: 8px; }
