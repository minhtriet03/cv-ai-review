import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import {
  Card,
  Button,
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Upload,
  message,
  
} from "antd";
import { format } from "date-fns";
import { UserOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [setUser]);

const handleUploadAvatar = async (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    message.error("Chỉ được phép upload file ảnh!");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    message.error("Bạn cần đăng nhập để upload ảnh!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cv-ai-review");
  formData.append("folder", "avatars");

  try {
    // Upload file to Cloudinary
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyz8bbxv5/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Cloudinary Response:", data);

    if (!data.secure_url) {
      throw new Error("Upload thất bại!");
    }

    // Send the uploaded image URL to the backend to update the user's profile picture
    const backendResponse = await fetch(
      "http://localhost:5000/api/user/update-profile-picture",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, imageUrl: data.secure_url }),
      }
    );

    const result = await backendResponse.json();
    console.log("Backend Response:", result);

    if (!backendResponse.ok) {
      throw new Error("Failed to update profile picture on the server.");
    }

    // Update user in localStorage and state
    const updatedUser = { ...user, profilePicture: data.secure_url };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser); // Update state

    message.success("Ảnh đại diện cập nhật thành công!");
  } catch (error) {
    console.error("Lỗi upload avatar:", error);
    message.error("Lỗi khi upload ảnh.");
  }
  };
  
const handleLogout = () => {
     localStorage.removeItem("user");
     localStorage.removeItem("token");
     setUser(null);
     navigate("/");
   };
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card bordered={false} style={{ textAlign: "center", padding: "20px" }}>
          <Title level={3}>User Information</Title>
          <Text type="secondary">
            Welcome back, <strong>{user?.name} </strong>
          </Text>
          <Space
            direction="vertical"
            size="middle"
            style={{ width: "100%", marginTop: 20 }}
          >
            {user?.profilePicture ? (
              <Avatar src={user.profilePicture} size={120} />
            ) : (
              <Avatar size={120} icon={<UserOutlined />} />
            )}
            <Upload
              name="file"
              beforeUpload={(file) => {
                handleUploadAvatar(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
            </Upload>
            <Text strong>
              <strong>
                {user?.name}

                <EditOutlined />
              </strong>
            </Text>
            <Text>
              <strong>Email:</strong> {user?.email}
            </Text>
            <Text>
              <strong>Joined Date:</strong>{" "}
              {user?.updatedAt &&
                format(new Date(user.updatedAt), "dd/MM/yyyy")}
            </Text>

            <Space style={{ marginTop: 20 }}>
              <Button color="purple" variant="outlined" href="/change-password">
                Change Password
              </Button>
              <Button danger onClick={handleLogout}>
                Log Out
              </Button>
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfo;
