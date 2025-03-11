import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const DashboardSection1 = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Card className="p-4 shadow-sm">
            <h2 className="fw-bold">Admin Dashboard</h2>
            <p className="text-muted">Overview of the admin panel</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardSection1;
