import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Header and Footer

import Header from "./components/header";
import Footer from "./components/footer";

// Components for this page

import Home from "./pages/home";
import Login from "./pages/login";
import LoginSuccess from "./pages/loginSuccess";
import Register from "./pages/register";
import Upload from "./pages/upload";
import SearchResult from "./pages/search";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResult />} />
          {/* <Route path="/search/:searchTerm" element={<SearchResult />} /> */}
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
