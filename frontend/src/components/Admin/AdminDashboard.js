import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";
import Dashboard from "../../pages/AdminPages/Dashboard";
import UserManagement from "../../pages/AdminPages/UserManagement";
import CVManagement from "../../pages/AdminPages/CVManagement";


const { Sider, Content } = Layout;

const AdminDashboard = () => {
  return (
      <Layout style={{ height: "100vh"}}>
      
        <Sider 
           width={250}
          style={{ 
           position: "fixed", // Giữ sidebar cố định
           left: 0,
           top: 0,
           bottom: 0,
           
           
        }} 
        >
          <Sidebar />
        </Sider>

      <Layout>
        <AdminHeader />
        <Content style={{ marginLeft: 250, padding: 24, background: "#fff" }}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="cv" element={<CVManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
