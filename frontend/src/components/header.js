import React, { useContext, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [setUser]);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        ></div>
        <span className="fw-bold">AI-Powered CV Analysis</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/upload">
            Upload & Analyze
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About Us
          </Nav.Link>
        </Nav>
        <Form
          className="d-flex ms-3 me-3 position-relative"
          style={{ maxWidth: "300px" }}
        >
          <FormControl
            type="search"
            placeholder="Search..."
            className="rounded-pill px-4 shadow-sm"
            style={{
              border: "1px solid #ccc",
              height: "40px",
            }}
          />
          <Button
            variant="light"
            className="position-absolute end-0 top-50 translate-middle-y me-2 p-1 border-0"
            style={{ background: "transparent" }}
          >
            <FaSearch size={14} />
          </Button>
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
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/");
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
