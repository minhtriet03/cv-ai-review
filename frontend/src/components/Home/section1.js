import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { message } from "antd";

const HeroSection = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("loginSuccess")) {
  //     message.success("Bạn đã đăng nhập thành công!");
  //     localStorage.removeItem("loginSuccess");
  //   }
  // }, []);

  return (
    <Container fluid className="hero-section py-5">
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center" style={{ width: '70%' }}>
          <h1 className="fw-bold mb-4 display-4 text-primary">
            Instant CV Analysis with AI
          </h1>
          <p className="lead mb-4 text-muted">
            Upload your CV and get instant AI-powered analysis and feedback
          </p>
          <a href="/upload" className="text-decoration-none">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-5 py-3 fw-bold shadow-sm"
              style={{
                borderRadius: '50px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
