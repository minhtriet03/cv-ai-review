import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Space,
  message,
  Avatar,
} from "antd";
import { SendOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const ChatSection = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const handleSend = async (res) => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/deepseek", {
        prompt: input,
      },{withCredentials: true});
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
      console.log("📩 Response from AI:", response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        message.error("⚠️ Bạn chưa đăng nhập!");
      } else {
        message.error("⚠️ Không thể gửi đến AI hãy kiểm tra đăng nhập");
      }
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Which scholarships can I apply to for studying Masters in CS at Stanford?",
    "I'm applying to Mechanical Engineering. Should I take AP stats or IB math SL?",
    "What should an appeal for in-state tuition at Michigan look like?",
  ];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessage = (msg, index) => {
    const isUser = msg.sender === "user";
    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: 16,
        }}
      >
        {!isUser && (
          <Avatar
            icon={<RobotOutlined />}
            style={{
              backgroundColor: "#e6f4ff",
              marginRight: 8,
            }}
          />
        )}
        <div
          style={{
            maxWidth: "75%",
            backgroundColor: isUser ? "#f0f0f0" : "#ffffff",
            padding: "12px 16px",
            borderRadius: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          {msg.text}
        </div>
        {isUser && (
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#d3adf7",
              marginLeft: 8,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "60px 20px",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Text type="secondary">AI counselor</Text>
      <Title level={2} style={{ margin: "10px 0" }}>
        Hello{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Title>
      <Title level={4}>How can I help you today?</Title>
      <Text>Ask me anything about your college applications</Text>

      <Row gutter={[16, 16]} justify="center" style={{ marginTop: 40 }}>
        {suggestions.map((s, i) => (
          <Col xs={24} sm={12} md={8} key={i}>
            <Card bordered style={{ borderRadius: 12, background: "#f9f9f9" }}>
              <Text>{s}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        style={{
          marginTop: 50,
          maxHeight: 400,
          overflowY: "auto",
          padding: "20px 10px",
          backgroundColor: "#fafafa",
          borderRadius: 16,
          border: "1px solid #eee",
        }}
      >
        {messages.map((msg, index) => renderMessage(msg, index))}
      </div>

      {/* Chat Input */}
      <Space
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 600,
          marginInline: "auto",
        }}
      >
        <Input
          placeholder="Your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          style={{
            borderRadius: "30px",
            padding: "10px 20px",
            height: 50,
            fontSize: "16px",
          }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          loading={loading}
          onClick={handleSend}
          style={{
            backgroundColor: "#6A5ACD",
            border: "none",
            width: 50,
            height: 50,
          }}
        />
      </Space>

      <div style={{ marginTop: 16, fontSize: 12, color: "#999" }}>
        🤝 Help us improve this AI counselor by sharing feedback via email or
        forum!
      </div>
    </div>
  );
};

export default ChatSection;
