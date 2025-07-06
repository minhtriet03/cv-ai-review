import { Space, Table, Button, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const CVManagement = () => {
  const [CVs, setCVs] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCVsbyIdUser(idUser);
  }, [idUser]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchCVsbyIdUser = async (id) => {
    try {
      if (id == null) {
        const response = await api.get("/cv/cvs", { withCredentials: true });
        setCVs(response.data);
      } else {
        const response = await api.get(`/cv/cvs/${id}`, { withCredentials: true });
        setCVs(response.data);
      }
    } catch (error) {
      console.error("Error fetching CVs:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users", { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/cv/cvs/delete/${id}`,
        {
          data: { isVerified: true },
          withCredentials: true
        }
      );
      message.success("Xác thực CV thành công!");
      fetchCVsbyIdUser(idUser);
    } catch (error) {
      console.error("Error verifying CV:", error);
      message.error("Không thể xác thực CV!");
    }
  };

  const confirmDelete = (id, name) => {
    const toastId = toast.warn(
      <div>
        <p>Bạn có chắc chắn muốn xóa CV <strong>{name}</strong> ?</p>
        <Button
          type="primary"
          danger
          onClick={() => {
            toast.dismiss(toastId);
            handleDelete(id);
          }}
        >
          Xác nhận
        </Button>
      </div>,
      { autoClose: true, duration: 5000 }
    );
  };

  const SearchableComboBox = ({ users, onChange }) => (
    <Select
      showSearch
      style={{ width: 300 }}
      placeholder="Chọn người dùng để lọc CV"
      optionFilterProp="children"
      allowClear
      onChange={(value) => setIdUser(value || null)}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {users.map((user) => (
        <Select.Option key={user._id} value={user._id} >
          {user.name}
        </Select.Option>
      ))}
    </Select>
  );

  const columns = [
    {
      title: "User Name",
      dataIndex: ["userId", "name"],
      key: "userName",
      render: (_, record) => record.userId?.name || "",
    },
    {
      title: "CV File",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "CV URL",
      dataIndex: "cvUrl",
      key: "cvUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View CV
        </a>
      ),
    },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_, record) => (
        <Space size="small">
          <Button danger onClick={() => confirmDelete(record._id, record.fileName)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Quản lý CV</h2>
      <div style={{ marginBottom: 16 }}>
        <SearchableComboBox
          users={users}
          onChange={(value) => setIdUser(value || null)}
        />
      </div>
      <Table columns={columns} dataSource={CVs} rowKey="_id" />
    </>
  );
};

export default CVManagement;
