import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user }) => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin người dùng (giả lập)
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg p-4 text-center">
              <h3 className="fw-bold">User Information</h3>
              <p className="text-muted">Welcome back, {user?.name}!</p>
              <Card.Body>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="img-placeholder mb-3"
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Joined Date:</strong> {user?.joinedDate}
                </p>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-100"
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserInfo;
