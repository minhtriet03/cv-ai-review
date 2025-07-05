import React, { useContext } from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { UserContext } from "../../UserContext";
const items = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: <Link to="/admin" style={{ textDecoration: 'none' }}>Dashboard</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link to="/admin/users" style={{ textDecoration: 'none' }}>Quản lý Người Dùng</Link>,
  },
  {
    key: "3",
    icon: <FileTextOutlined />,
    label: <Link to="/admin/cv" style={{ textDecoration: 'none' }}>Quản lý CV</Link>,
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    // Gọi API backend để xoá cookie
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      // Có thể log lỗi nếu cần
    }
    logout(); // Cập nhật context và xóa localStorage
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const sidebarItems = [
    ...items,
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      className="custom-menu"
      items={sidebarItems}
    />
  );
};

export default Sidebar;
