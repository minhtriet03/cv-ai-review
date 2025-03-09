import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

const dummyResults = [
  {
    id: 1,
    title: "Senior Software Engineer CV",
    description: "Well-structured CV with strong experience.",
  },
  {
    id: 2,
    title: "Marketing Specialist Resume",
    description: "Great communication and digital marketing skills.",
  },
  {
    id: 3,
    title: "Data Scientist CV",
    description: "Strong analytical skills and machine learning expertise.",
  },
];

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(dummyResults);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = dummyResults.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <section className="py-5">
      <Container>
        {/* Thanh tìm kiếm */}
        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="search"
                placeholder="Search CVs or Resumes..."
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="dark">
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Hiển thị kết quả */}
        <Row>
          {results.length > 0 ? (
            results.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
                <Card className="shadow-sm p-3">
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="outline-dark">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p className="text-muted">No results found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default SearchResults;
