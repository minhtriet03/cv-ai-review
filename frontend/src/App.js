import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import SignupSection from "./components/Home/section4";
import TestimonialsSection from "./components/Home/section5";
function App() {
  return (
    <div className="container">
      <Header />
      <SignupSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default App;
