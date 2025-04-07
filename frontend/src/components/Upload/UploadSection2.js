// frontend/src/pages/analyze.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Button, Spin, message } from "antd";
import { Document, Page, pdfjs } from "react-pdf";

const { Title, Text, Paragraph } = Typography;

// Cấu hình Worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AnalyzePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cvUrl = location.state?.cvUrl;
  const cvId = location.state?.cvId;

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (!cvUrl || !cvId) {
      message.error("Thông tin CV không hợp lệ");
      navigate("/upload");
      return;
    }

    analyzeCV();
  }, [cvId, cvUrl]);

  const analyzeCV = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/cv/analyze/${cvId}`
      );

      if (!response.ok) {
        throw new Error("Phân tích CV thất bại");
      }

      const data = await response.json();
      setReview(data.review);
    } catch (error) {
      console.error("Lỗi khi phân tích CV:", error);
      message.error(`Lỗi khi phân tích CV: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatReview = (reviewText) => {
    if (!reviewText) return null;

    // Phân tích chuỗi đánh giá và định dạng thành các phần
    const sections = reviewText.split(/\d+\./g).filter((text) => text.trim());

    return (
      <>
        {sections.map((section, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <Paragraph>
              <strong>{index + 1}.</strong>
              {section}
            </Paragraph>
          </div>
        ))}
      </>
    );
  };

  return (
    <section style={{ padding: "40px", backgroundColor: "#f4f4f4" }}>
      <Row gutter={[24, 24]} justify="center">
        {/* CV Preview */}
        <Col xs={24} md={10}>
          <Card hoverable style={{ textAlign: "center", padding: "10px" }}>
            <Text type="secondary">CV của bạn</Text>
            {cvUrl ? (
              <div
                style={{
                  marginTop: "10px",
                  height: "600px",
                  overflowY: "auto",
                }}
              >
                <Document
                  file={cvUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={400}
                    />
                  ))}
                </Document>
              </div>
            ) : (
              <div>Không thể hiển thị CV</div>
            )}
          </Card>
        </Col>

        {/* AI Feedback */}
        <Col xs={24} md={14}>
          <Card style={{ padding: "20px" }}>
            <Title level={3}>Phân tích CV bằng AI</Title>

            {loading ? (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
                <div style={{ marginTop: "20px" }}>
                  Đang phân tích CV của bạn...
                </div>
              </div>
            ) : review ? (
              <div>
                <Text>Đánh giá chi tiết về CV của bạn:</Text>
                <div style={{ marginTop: "15px" }}>{formatReview(review)}</div>
                <Button
                  type="primary"
                  onClick={() => navigate("/upload")}
                  style={{ marginTop: "15px" }}
                >
                  Tải lên CV mới
                </Button>
              </div>
            ) : (
              <div>Không thể tải kết quả phân tích</div>
            )}
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default AnalyzePage;
