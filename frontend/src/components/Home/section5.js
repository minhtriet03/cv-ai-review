import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    text: "The AI CV review tool helped me land my dream job!",
  },
  {
    name: "Jane Smith",
    text: "Amazing tool, saved me so much time!",
  },
  {
    name: "Alex Johnson",
    text: "Highly recommended for anyone job hunting",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-4">Testimonials</h2>
        <Row className="justify-content-center">
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={index} className="d-flex justify-content-center">
              <Card
                className="p-3 shadow-sm border-0 rounded-3 bg-white"
                style={{ maxWidth: "300px" }}
              >
                <div className="d-flex align-items-center mb-2">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#ccc",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></div>
                  <strong>{testimonial.name}</strong>
                </div>
                <p className="mb-2">{testimonial.text}</p>
                <div className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
