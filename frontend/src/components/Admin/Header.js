import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
    </Header>
  );
};

export default AdminHeader;
