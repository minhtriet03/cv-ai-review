import React, { useState } from "react";
import { Upload, Card, Typography, message, Button } from "antd";
import { InboxOutlined,UploadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const handleUploadCV = async (file) => {
  console.log("🧐 File trước khi upload:", file);
  if (!file) {
    message.error("Không có file nào được chọn!");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) {
    console.error("❌ User is not logged in or user ID is missing:", user);
    message.error("Bạn cần đăng nhập để upload CV!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cv-ai-review"); // Cloudinary upload preset
  formData.append("folder", "cv-uploads"); // Optional: Specify a folder in Cloudinary

  try {
    // Step 1: Upload file to Cloudinary
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudinaryResult = await cloudinaryResponse.json();
    console.log("📤 Cloudinary Response:", cloudinaryResult);

    if (!cloudinaryResponse.ok || !cloudinaryResult.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const cvUrl = cloudinaryResult.secure_url; // URL of the uploaded file
    const fileName = file.name; // Name of the file

    // Log dữ liệu gửi đến backend
    console.log("📤 Sending data to backend:", {
      userId: user._id,
      cvUrl,
      fileName,
    });

    // Step 2: Send data to backend
    const backendResponse = await fetch("http://localhost:5000/api/upload/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        cvUrl,
        fileName,
      }),
    });

    const backendResult = await backendResponse.json();
    console.log("📥 Server Response:", backendResult);

    if (!backendResponse.ok) {
      throw new Error(backendResult.message || "Failed to upload CV");
    }

    message.success("CV tải lên thành công!");
  } catch (error) {
    console.error("❌ Error uploading CV:", error);
    message.error("Đã xảy ra lỗi khi upload CV.");
  }
};

const UploadSection = () => {
  const [file, setFile] = useState(null); // State to manage the selected file

  return (
    <section style={{ padding: "40px", background: "#f5f5f5" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <Title level={2}>Upload CV</Title>
        <Paragraph>Kéo thả hoặc chọn file CV của bạn để tải lên.</Paragraph>

        <Dragger
          name="file"
          multiple={false}
          accept=".pdf,.doc,.docx"
          beforeUpload={(file) => {
            if (file.size > 5 * 1024 * 1024) {
              message.error("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
              return Upload.LIST_IGNORE;
            }
            setFile(file); // Update the file state
            // handleUploadCV(file); // Call the upload function
            return false; // Prevent default upload behavior
          }}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: "36px" }} />
          </p>
          <p className="ant-upload-text">
            Nhấn vào đây hoặc kéo thả file để tải lên
          </p>
          <p className="ant-upload-hint">
            Chấp nhận các định dạng: PDF, DOC, DOCX (tối đa 5MB)
          </p>
        </Dragger>

        {file && (
          <Card style={{ marginTop: "20px", textAlign: "left" }}>
            <Paragraph strong>Tập tin đã chọn:</Paragraph>
            <Paragraph>{file.name}</Paragraph>
            <Paragraph>
              <strong>Loại file:</strong> {file.type}
            </Paragraph>
          </Card>
        )}
        {/* add click in button */}
        <Button
          onClick={() => {
            if (!file) {
              message.error("Vui lòng chọn file trước khi upload!");
              return;
            }
            handleUploadCV(file);
          }}
          type="primary"
          style={{ marginTop: "20px" }}
          icon={<UploadOutlined />}
        >
          Upload CV
        </Button>
      </div>
    </section>
  );
};

export default UploadSection;
