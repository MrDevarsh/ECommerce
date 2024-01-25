import React, { useContext, useState } from "react";
import "./Navbar.css";
import { ShoppingCartOutlined } from "@mui/icons-material";
import logo from "../Assets/logo.png";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const Navbar = () => {
  
  const [cartCount, setCartCount] = useState(2); // State for cart counter


  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link to='/'>
          <img src={logo} alt="Brand Logo" className="brand-logo" />
        </Link>

        {/* <div className=""> */}
          
        {/* </div> */}

            <Link to='/cart' className="nav-item nav-link ms-3">
        
          <ShoppingCartOutlined />
          {cartCount > 0 && (
            <sup className="badge rounded-circle bg-danger text-white">
              {cartItems.reduce((sum, item) => sum + item.qty, 0)}
            </sup>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
