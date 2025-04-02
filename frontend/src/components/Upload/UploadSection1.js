import React, { useState } from "react";
import { Upload, Card, Typography, message, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

// Cấu hình Worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadSection = () => {
  const [file, setFile] = useState(null); // Lưu file tạm thời
  const [fileURL, setFileURL] = useState(null); // Lưu URL để xem preview
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      message.error("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
      return Upload.LIST_IGNORE;

    }
    const fileURL = URL.createObjectURL(file);
    setFile(file);
    setFileURL(fileURL);
    return false; // Ngăn chặn upload tự động
    
  };

const handleUploadCV = async () => {
  if (!file) {
    message.error("Vui lòng chọn file trước khi upload!");
    return;
  }

  const userId = localStorage.getItem("userId");
  console.log("🔍 userId từ localStorage:", userId);

  if (!userId) {
    message.error("Không tìm thấy userId. Vui lòng đăng nhập lại!");
    return;
  }

  console.log("File chuẩn bị upload:", file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cv-ai-review");

  try {
    // 🟢 Upload lên Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: formData }
    );

    const result = await response.json();
    console.log("Cloudinary API Response:", result);

    if (!response.ok || !result.secure_url) {
      throw new Error(result.error?.message || "Upload thất bại!");
    }

    // 🟢 Gửi link CV lên backend để lưu vào MongoDB
    const saveResponse = await fetch("http://localhost:5000/api/upload/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        cvUrl: result.secure_url,
        fileName: file.name,
      }),
    });

    const saveResult = await saveResponse.json();
    console.log("Backend Response:", saveResult);

    if (!saveResponse.ok) {
      throw new Error(saveResult.message || "Lưu CV thất bại!");
    }
    
    message.success("CV tải lên & lưu thành công!");
    navigate("/analyze", {
      state: {
        cvUrl: result.secure_url,
        cvId: saveResult.cv._id,
      },
    });
  } catch (error) {
    console.error("Lỗi upload:", error);
    message.error(`Đã xảy ra lỗi khi upload CV: ${error.message}`);
  }
};


  return (
    <section style={{ padding: "40px", background: "#f5f5f5" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <Title level={2}>Upload CV</Title>
        <Paragraph>Kéo thả hoặc chọn file CV của bạn để tải lên.</Paragraph>

        <Dragger beforeUpload={handleFileChange} showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: "36px" }} />
          </p>
          <p className="ant-upload-text">
            Nhấn vào đây hoặc kéo thả file để tải lên
          </p>
          <p className="ant-upload-hint">
            Chấp nhận các định dạng: PDF (tối đa 5MB)
          </p>
        </Dragger>

        {fileURL && (
          <Card style={{ marginTop: "20px", textAlign: "left" }}>
            <Paragraph strong>Tập tin đã chọn:</Paragraph>
            <Paragraph>{file.name}</Paragraph>
            <Document
              file={fileURL}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </Card>
        )}

        <Button
          onClick={handleUploadCV}
          type="primary"
          style={{ marginTop: "20px" }}
          icon={<UploadOutlined />}
        >
          Analyze CV
        </Button>
        <p className="ant-upload-text" style={{ marginTop: "20px" }}>
          🔒Dữ liệu được nhập trong CV của bạn được bảo mật. Không có PII nào
          được thu thập/lưu trữ từ tài liệu.
        </p>
      </div>
    </section>
  );
};

export default UploadSection;
