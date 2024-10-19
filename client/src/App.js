import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Invoice from "./components/invoice/Invoice";
import Products from "./components/products/Products";
import Buyer from "./components/buyer/Buyer";
import Seller from "./components/seller/Seller";
import { useTheme } from "./provider/ThemeProvider";
import { ToastContainer } from "react-toastify";
function App() {
  const { theme } = useTheme();

  return (
    <div className="App">
     
      <Header />
      <div
        className={`${
          theme === "light" ? "bg-white border-gray-200" : "bg-gray-800"
        } px-4 lg:px-6 py-6`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Seller />} />
          <Route path="/buyer" element={<Buyer />} />
        </Routes>
      </div>
       <ToastContainer />
    </div>
  );
}

export default App;
