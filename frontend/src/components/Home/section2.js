import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const FeaturesOverview = () => {
  const features = [
    {
      category: "AI-powered",
      title: "Skill Analysis",
      description: "Identify key skills in your CV",
    },
    {
      category: "Advanced algorithms",
      title: "Compatibility Scoring",
      description: "Match CV with job descriptions",
    },
    {
      category: "Error-free CV",
      title: "Error Detection",
      description: "Highlight CV mistakes and inconsistencies",
    },
  ];

  return (
    <Container className="text-center py-5">
      <h2 className="fw-bold">Features Overview</h2>
      <Row className="mt-4 justify-content-center">
        {features.map((feature, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#eee",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="p-4 text-center"
              >
                {feature.title}
              </div>
              <Card.Body>
                <small className="text-muted">{feature.category}</small>
                <Card.Title className="mt-2">{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturesOverview;
