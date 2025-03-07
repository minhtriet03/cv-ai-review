import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const UploadSection = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.size <= 5 * 1024 * 1024) {
      // Giới hạn 5MB
      setFile(uploadedFile);
    } else {
      alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
    }
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center align-items-center">
          {/* Cột trái - Xem trước CV */}
          <Col md={5} className="d-flex justify-content-center">
            <div
              className="bg-secondary"
              style={{ width: "100%", height: "350px", borderRadius: "10px" }}
            >
              {/* Sau này có thể thay thế bằng PDF Viewer */}
            </div>
          </Col>

          {/* Cột phải - Upload Form */}
          <Col md={6}>
            <h2 className="fw-bold">Upload Section</h2>
            <p className="text-muted">
              Drag and drop your CV file here or click the button to upload
            </p>

            <div className="d-flex align-items-center mb-3">
              <Button variant="outline-dark" className="me-2">
                None
              </Button>
              <label className="btn btn-dark">
                Upload CV
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Hiển thị file đã chọn */}
            {file && (
              <Card className="p-3 shadow-sm">
                <small className="text-muted">Max file size: 5MB</small>
                <div className="bg-light text-center p-4 mt-2 rounded">
                  <p>{file.name}</p>
                </div>
                <p className="mt-2">
                  <strong>File type:</strong> PDF, DOC, DOCX
                </p>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UploadSection;
