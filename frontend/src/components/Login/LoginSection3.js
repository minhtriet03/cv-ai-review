// trang Profile của người dùng

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import {
  Card,
  Button,
  Input,
  Form,
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
import api from "../../api";
const createError = require("http-errors");

const { Title, Text } = Typography;

const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");

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
      const response = await api.post(
        "/image/upload",
        formData
      );
      const data = response.data;
      // console.log("Cloudinary Response:", data);

      if (!data.secure_url) {
        throw new Error("Upload thất bại!");
      }

      // Send the uploaded image URL to the backend to update the user's profile picture
      const backendResponse = await api.post(
        "/user/update-profile-picture",
        { userId: user._id, imageUrl: data.secure_url },
        { withCredentials: true }
      );
      const result = backendResponse.data;
      // console.log("Backend Response:", result);

      if (!backendResponse.status || backendResponse.status !== 200) {
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

  const handleEditName = (res, req ) => {
    
  };
  // logic xử lý đổi mật khẩu
  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      message.error("Vui lòng nhập mật khẩu hiện tại!");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await api.post(
        "/change-password",
        {
          userId: user._id,
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      const result = response.data;
      if (!response.status || response.status !== 200) {
        throw new Error(result.message);
      }

      message.success("Mật khẩu đã được thay đổi thành công!");
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      message.error(`Lỗi: ${error.message}`);
    }
  };
  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
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
            {showEditName ? (
              <div>
                <Input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: 180 }}
                  size="small"
                />
                <Button type="primary" size="small" onClick={async () => {
                  // Cập nhật tên user vào localStorage và context
                  const updatedUser = { ...user, name: editName };
                  localStorage.setItem("user", JSON.stringify(updatedUser));
                  // console.log(user._id);
                  try {
                    const response = await api.post(
                      "/user/update-name",
                      { _id: user._id, name: editName },
                      { withCredentials: true }
                    );
                    const result = response.data;
                    // console.log(result);
                    setUser(updatedUser);
                    setShowEditName(false);
                    message.success("Đã cập nhật tên!");
                  } catch (error) {
                    message.error("Lỗi khi cập nhật tên!");
                  }
                }}>Lưu</Button>
                <Button size="small" onClick={() => {
                  setEditName(user?.name || "");
                  setShowEditName(false);
                }}>Hủy</Button>
              </div>
            ) : (
              <Text strong mr={12}>
                {user?.name}
                <Button icon={<EditOutlined />} style={{ marginLeft: 10 }} onClick={() => {
                  setEditName(user?.name || "");
                  setShowEditName(true);
                }} />
              </Text>
            )}
            <Text>
              <strong>Email:</strong> {user?.email}
            </Text>
            <Text>
              <strong>Joined Date:</strong>{" "}
              {user?.updatedAt &&
                format(new Date(user.updatedAt), "dd/MM/yyyy")}
            </Text>

            <Space style={{ marginTop: 20 }}>
              {!showPasswordForm && (
                <Button
                  color="purple"
                  variant="outlined"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Change Password
                </Button>
              )}

              {showPasswordForm && (
                <div style={{ marginTop: 20 }}>
                  <Title level={5}>Change password</Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Space>
                      <Button type="primary" onClick={handleUpdatePassword}>
                        Update Password
                      </Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                    </Space>
                  </Space>
                </div>
              )}
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfo;
