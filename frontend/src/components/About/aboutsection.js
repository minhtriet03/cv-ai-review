import React from "react";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <section style={{ padding: "50px 20px", backgroundColor: "#f5f5f5" }}>
      {/* Tiêu đề */}
      <Row justify="center" style={{ textAlign: "center", marginBottom: 30 }}>
        <Col span={24}>
          <Title level={2}>About Us</Title>
          <Paragraph type="secondary">
            Empowering job seekers with AI-driven CV analysis.
          </Paragraph>
        </Col>
      </Row>

      {/* Nội dung chính */}
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <Title level={4}>AI-Powered Analysis</Title>
            <Paragraph type="secondary">
              We provide intelligent insights to optimize your CV and improve
              your job prospects.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <Title level={4}>User-Friendly Platform</Title>
            <Paragraph type="secondary">
              Easy to use, fast, and reliable—helping you create the best
              possible resume.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <Title level={4}>HR & Recruiter Support</Title>
            <Paragraph type="secondary">
              Connecting top talent with hiring managers through AI-driven
              insights.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default AboutUs;
