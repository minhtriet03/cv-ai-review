import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider, UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

//Header and Footer

import Header from "./components/header";
import Footer from "./components/footer";

// Components for this page

import Home from "./components/Home/section1";
import Login from "./pages/login";
import Register from "./pages/register";
import Upload from "./pages/upload";
import About from "./pages/about";
import UserInfo from "./components/Login/LoginSection3";
import Term from "./pages/term-service";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPassword from "./components/Login/LoginSection5";
import Analyze from "./pages/analyze";
import ChatboxAI from "./pages/chatboxAI";
import EvaluatedCVs from "./pages/EvaluatedCVs";
import CreateCv from "./pages/WriteCV";
//admin
import AdminDashboard from "./components/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminRoute({ children }) {
  const { isAdmin } = useContext(UserContext);
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppContent() {
  const { user, isAdmin  } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin" && !location.pathname.startsWith("/admin")) {
        navigate("/admin", { replace: true });
      } else if (user.role !== "admin" && location.pathname.startsWith("/admin")) {
        navigate("/", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isAdmin && <Header />}
      <Routes>
        {/* Route cho admin, bảo vệ bằng AdminRoute */}
        <Route path="/admin/*" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* Các route cho user */}
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/ai-counselor" element={<ChatboxAI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<UserInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/term-privacy" element={<Term />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/evaluated-cvs" element={<EvaluatedCVs />} />
        <Route path="/create-cv" element={<CreateCv />} />
      </Routes>
      {!isAdmin && <Footer />}
     
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
      <ToastContainer position="top-right" autoClose={5000} />
         <AppContent />
      </Router>
    </UserProvider>
  );
}
export default App;
