import React, { useEffect, useState, useContext } from "react";
import { Space, Table, Tag, Button, Avatar, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../UserContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { user, isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {withCredentials:true});
      setUsers(response.data); // API trả về danh sách user từ MongoDB
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Không thể tải danh sách người dùng!");
    }
  };

  const handleBlock = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}/block`, { isBlocked: true },{withCredentials:true});
      message.success("Khóa người dùng thành công!");
      fetchUsers(); // Load lại danh sách user  
    } catch (error) {
      console.error("Error blocking user:", error);
      message.error("Không thể khóa người dùng!");
    }
  };
  const handleUnblock = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}/unblock`, { isBlocked: false },{withCredentials:true});
      message.success("Mở khóa người dùng thành công!");
      fetchUsers(); // Load lại danh sách user
    } catch (error) {
      console.error("Error unblocking user:", error);
      message.error("Không thể mở khóa người dùng!");
    }
  };
  const handleDelete = async (id) => {
    try {

      await axios.delete(`http://localhost:5000/api/users/${id}`,{withCredentials:true});
      message.success("Xóa người dùng thành công!");
      fetchUsers(); // Load lại danh sách user
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Không thể xóa người dùng!");
    }
  };
  const handleSetRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, { role: newRole }, { withCredentials: true });
      message.success(`Đã cập nhật quyền thành ${newRole}!`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      message.error("Không thể cập nhật quyền!");
    }
  };
  const confirmDelete = (id,name) => {
    const toastId = toast.warn(
      <div>
        <p>Bạn có chắc chắn muốn xóa tài khoản <strong> {name} </strong> ?</p>
        <Button type="primary" danger onClick={()=>
          {
            toast.dismiss(toastId);
            handleDelete(id)
          }
        }>Xác nhận</Button>
      </div>,
      { autoClose: true ,
       duration: 5000,
      }
    );
  };
  const columns = [
    {
      title: "Profile",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (url) => <Avatar src={url} alt="Profile" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "gold";
        if (role === "admin") color = "red";
        if (role === "reviewer") color = "geekblue";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (verified) =>
        verified ? <Tag color="green">Verified</Tag> : <Tag color="volcano">Pending</Tag>,
    },
    {
      title: "Blocked",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (blocked) =>
        blocked ? <Tag color="red">Blocked</Tag> : <Tag color="green" >Active</Tag>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_, record) => (
        <Space size="small">
          {record.isBlocked ? (
            <Button type="dashed" onClick={() => handleUnblock(record._id)}>Unblock</Button>
          ) : (
            <Button type="primary" ghost onClick={() => handleBlock(record._id)}>Block</Button>
          )}
          <Button danger onClick={() => confirmDelete(record._id, record.name)}>Delete</Button>
          {record.role !== "admin" ? (
            <Button onClick={() => handleSetRole(record._id, "admin")}>Set Admin</Button>
          ) : (
            <Button onClick={() => handleSetRole(record._id, "user")}>Set User</Button>
          )}
        </Space>
      ),
    },
  ];

  if (!user || !isAdmin) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <h2>Bạn không có quyền truy cập trang này</h2>
      </div>
    );
  }

  return (
    <>
      <h2>Quản lý Người dùng</h2>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </>
  );
};

export default UserManagement;
