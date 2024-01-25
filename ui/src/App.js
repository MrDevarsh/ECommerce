import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Components/Cart/Cart";
import Shipment from "./Pages/Shipment";
import Invoice from "./Pages/Invoice";
import { CartProvider } from "./Context/CartContext";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
