import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { message } from "antd";
import api from "../api";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [setUser]);

  return (
    <Navbar bg="#f2f4f7" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src="/images/new-logo.svg"
          alt="CV AI Review Logo"
          style={{ width: "48px", height: "48px", marginRight: "12px" }}
        />
        <span className="fw-bold">AI-Powered CV Analysis</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="fw-bold">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/upload" className="fw-bold">
            Review CV
          </Nav.Link>
          <Nav.Link as={Link} to="/ai-counselor" className="fw-bold">
            AI Counselor
          </Nav.Link>
          <Nav.Link as={Link} to="/evaluated-cvs" className="fw-bold">
            Your CV
          </Nav.Link>
          <Nav.Link as={Link} to="/create-cv" className="fw-bold">
            Create your CV
          </Nav.Link>
        </Nav>
        <Form
          className="d-flex ms-3 me-3 position-relative"
          style={{ maxWidth: "300px" }}
        >
         
        </Form>

        {user ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="border-0 bg-transparent p-0"
            >
              <img
                src={user.profilePicture || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/info">
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                   onClick={() => {
                     api.post("/logout").then(response => {
                       // console.log(response.data.message);
                       localStorage.clear();
                       setUser(null);
                       navigate("/login");
                       message.success("Đăng xuất thành công!");
                     }).catch(error => {
                       console.error("❌ Lỗi khi gọi logout:", error);
                       message.error("Đăng xuất thất bại!");
                     });
                   }}
                   style={{ color: "black" }}
                   onMouseEnter={(e) => (e.target.style.color = "red")}
                   onMouseLeave={(e) => (e.target.style.color = "black")}
                   >
                   Logout
                   </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Nav.Link as={Link} to="/login">
            Login/Signup
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
