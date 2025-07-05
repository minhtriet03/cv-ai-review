import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Spin } from "antd";
import axios from "axios";
import { Bar } from "@ant-design/charts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/dashboard/stats", { withCredentials: true });
      setStats(res.data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading || !stats) return <Spin />;

  // Chuẩn hóa data cho biểu đồ
  const cvData = Object.entries(stats.cvByDate).map(([date, value]) => ({ date, value }));
  const userData = Object.entries(stats.userByDate).map(([date, value]) => ({ date, value }));

  const cvConfig = {
    data: cvData,
    xField: "date",
    yField: "value",
    color: "#1890ff",
    xAxis: { title: { text: "Ngày" } },
    yAxis: { title: { text: "Số CV đã đánh giá" } },
    height: 300,
  };

  const userConfig = {
    data: userData,
    xField: "date",
    yField: "value",
    color: "#52c41a",
    xAxis: { title: { text: "Ngày" } },
    yAxis: { title: { text: "Số user đăng ký" } },
    height: 300,
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số CV đã đánh giá" value={stats.totalEvaluatedCVs} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số người dùng" value={stats.totalUsers} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 32 }}>
        <Col span={12}>
          <Card title="CV đã đánh giá theo ngày">
            <Bar {...cvConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User đăng ký theo ngày">
            <Bar {...userConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
