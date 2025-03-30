import React from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

// Cấu hình Worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AnalyzeSection = () => {
  const location = useLocation();
  const cvUrl = location.state?.cvUrl; // Lấy URL của CV từ state khi upload

  return (
    <section style={{ padding: "40px", backgroundColor: "#f4f4f4" }}>
      <Row gutter={[24, 24]} justify="center">
        {/* CV Preview */}
        <Col xs={24} md={10}>
          <Card hoverable style={{ textAlign: "center", padding: "10px" }}>
            <Text type="secondary">Your uploaded CV preview</Text>

            {cvUrl ? (
              <div
                style={{
                  marginTop: "10px",
                  height: "600px",
                  overflowY: "auto",
                }}
              >
                <Document file={cvUrl}>
                  <Page pageNumber={1} width={400} />
                </Document>
              </div>
            ) : (
              <img
                alt="CV Preview"
                src="/your-cv-image-url.png"
                style={{ width: "100%", height: "auto", marginTop: "10px" }}
              />
            )}
          </Card>
        </Col>

        {/* AI Feedback */}
        <Col xs={24} md={14}>
          <Card style={{ padding: "20px" }}>
            <Title level={3}>AI-Powered CV Analysis</Title>
            <Text>
              Here’s the feedback on your resume, broken down by key dimensions:
            </Text>
            <ul style={{ marginTop: "15px" }}>
              <li>
                <Text strong>Length, Readability & Verbosity:</Text> Some
                descriptions could be more concise.
              </li>
              <li>
                <Text strong>Relevance:</Text> Your resume is well-suited for
                tech-related applications.
              </li>
              <li>
                <Text strong>Quantification:</Text> Consider adding specific
                numbers to highlight achievements.
              </li>
              <li>
                <Text strong>Action Verbs:</Text> Improve the impact of your
                descriptions with strong action words.
              </li>
            </ul>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              style={{ marginTop: "15px" }}
            >
              Upload New CV
            </Button>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default AnalyzeSection;
