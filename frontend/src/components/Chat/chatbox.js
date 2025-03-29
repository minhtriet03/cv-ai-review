import React, { useState } from "react";
import { Input, Button, Layout, Typography, List, Avatar, Spin } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      console.log("📤 Gửi request đến backend:", input);
      const response = await axios.post("http://localhost:5000/api/deepseek", {
        prompt: input,
      });

      console.log("📥 Phản hồi từ backend:", response.data);
      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error(
        "❌ Lỗi API:",
        error.response ? error.response.data : error
      );
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "❌ Không thể lấy phản hồi từ AI. Vui lòng thử lại!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          backgroundColor: "#1890ff",
          color: "white",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        🤖 AI Chat Assistant
      </Header>

      {/* Chatbox */}
      <Content
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={
                        msg.sender === "user" ? (
                          <UserOutlined />
                        ) : (
                          <RobotOutlined />
                        )
                      }
                    />
                  }
                  title={msg.sender === "user" ? "Bạn" : "AI"}
                  description={msg.text}
                  style={{
                    background: msg.sender === "user" ? "#1890ff" : "#f5f5f5",
                    padding: "10px",
                    borderRadius: "10px",
                    color: msg.sender === "user" ? "white" : "black",
                  }}
                />
              </List.Item>
            )}
          />
          {loading && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Spin size="small" />
            </div>
          )}
        </div>
      </Content>

      {/* Input Box */}
      <Footer
        style={{
          background: "white",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={sendMessage}
          style={{ flex: 1, marginRight: "10px", borderRadius: "5px" }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessage}
          disabled={loading}
        />
      </Footer>
    </Layout>
  );
};

export default ChatBox;
