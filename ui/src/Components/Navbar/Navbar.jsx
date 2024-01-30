import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Download, GpsFixed, ShoppingCartOutlined } from "@mui/icons-material";
import { CartContext } from "../../Context/CartContext";
import logo from "../Assets/logo.png";
import './Navbar.css'

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Brand Logo" className="brand-logo" />
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/invoice' className="nav-link">
                <Download /> Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/trackShipment" className="nav-link">
                <GpsFixed /> Track Shipment
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-nav">
          <Link to="/cart" className="nav-link">
            <ShoppingCartOutlined />
            {cartItems.length > 0 && (
              <sup className="badge bg-danger">{cartItems.reduce((sum, item) => sum + item.qty, 0)}</sup>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
