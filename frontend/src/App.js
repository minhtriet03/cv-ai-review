import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
function App() {
  return (
    <div className="container">
      <Header />
      <Home/>
      <Footer />
    </div>
  );
}

export default App;
