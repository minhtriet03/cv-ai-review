// frontend/src/pages/analyze.js
import React, { useState, useEffect ,useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Button, Spin, message } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import api from "../../api";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const hasAnalyzed = useRef(false);

useEffect(() => {
  if (hasAnalyzed.current) return;
  hasAnalyzed.current = true;

  if (!cvUrl || !cvId) {
    message.error("Thông tin CV không hợp lệ");
    navigate("/upload");
    return;
  }

  analyzeCV();
}, [cvUrl, cvId, navigate]);

  const analyzeCV = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/cv/analyze/${cvId}`,{withCredentials: true }
      );
      if (!response) {
        throw new Error("Phân tích CV thất bại");
      }
      setReview(response.data.review);
    } catch (error) {
      console.error("Chi tiết lỗi:");
      console.error("Tên:", error.name);
      console.error("Thông điệp:", error.message);
      console.error("Stack:", error.stack);
      if (error.response && error.response.status === 401) {
        message.error("Bạn cần đăng nhập để sử dụng chức năng này!");
      } else {
        message.error(`Lỗi khi phân tích CV: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatReview = (reviewText) => {
    if (!reviewText) return null;

    // Phân tích chuỗi đánh giá và định dạng thành các phần
    const sections = reviewText.split(/\d+\./g).filter((text) => text.trim());

    // Regex để tìm điểm số dạng x/y (ví dụ: 8/10, 7.5/10)
    const scoreRegex = /(\d+(?:\.\d+)?\s*\/\s*10)/;

    return (
      <ul className="list-group list-group-flush">
        {sections.map((section, index) => {
          // Tìm điểm số trong section
          const match = section.match(scoreRegex);
          let score = null;
          let content = section;
          if (match) {
            score = match[1];
            // Loại bỏ điểm số khỏi nội dung
            content = section.replace(scoreRegex, '').replace(':', '').trim();
          }
          return (
            <li
              key={index}
              className="list-group-item d-flex flex-column  justify-content-between align-items-center shadow-sm"
              style={{
                borderRadius: '12px',
                marginBottom: '16px',
                background: '#fff',
                border: '1px solid #e3e3e3',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)')}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#2d3a4b',
                    marginBottom: 6,
                    wordBreak: 'break-word',
                    maxHeight: '450px',
                    overflowY: 'auto',
                    width: '100%',
                    paddingRight: 4,
                  }}
                >
                  <span>{index + 1}.</span>
                  {/* Tách content theo dấu gạch ngang và xuống dòng */}
                  {content.split(/\s*-\s*/).map((part, idx) => (
                    idx === 0 ? (
                      <span key={idx} style={{ marginLeft: 8, fontSize: 16, fontWeight: 400 }}>{part}</span>
                    ) : (
                      <div key={idx} style={{ marginLeft: 24, fontSize: 15, fontWeight: 400, color: '#444', display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ marginRight: 6, color: '#bbb' }}>-</span>
                        <span>{part}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              {score && (
                <span
                  className="badge bg-success fs-5 d-flex align-items-center"
                  style={{
                    minWidth: '70px',
                    height: '38px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <i className="bi bi-star-fill" style={{ marginRight: 6, color: '#fff700' }}></i>
                  {score}
                </span>
              )}
            </li>
          );
        })}
      </ul>
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
                <div style={{ marginTop: "15px" }}>
                  {formatReview(review)}
                </div>
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
