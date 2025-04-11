import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserProvider } from "./UserContext";
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
import UserInfo from "./components/Login/LoginSection3";
import Term from "./pages/term-service";
import ForgotPasswordPage from "./pages/forgot-password";

import Analyze from "./pages/analyze";
import ChatboxAI from "./pages/chatboxAI";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/ai-counselor" element={<ChatboxAI />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="/info" element={<UserInfo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/about" element={<About />} />
            <Route path="/term-privacy" element={<Term />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
