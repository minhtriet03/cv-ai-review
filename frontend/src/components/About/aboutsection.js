import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        {/* Tiêu đề */}
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">About Us</h2>
            <p className="text-muted">
              Empowering job seekers with AI-driven CV analysis.
            </p>
          </Col>
        </Row>

        {/* Nội dung chính */}
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center">
              <Card.Body>
                <h5 className="fw-bold">AI-Powered Analysis</h5>
                <p className="text-muted">
                  We provide intelligent insights to optimize your CV and
                  improve your job prospects.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center">
              <Card.Body>
                <h5 className="fw-bold">User-Friendly Platform</h5>
                <p className="text-muted">
                  Easy to use, fast, and reliable—helping you create the best
                  possible resume.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center">
              <Card.Body>
                <h5 className="fw-bold">HR & Recruiter Support</h5>
                <p className="text-muted">
                  Connecting top talent with hiring managers through AI-driven
                  insights.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
