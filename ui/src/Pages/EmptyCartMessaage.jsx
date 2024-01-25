import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const EmptyCartMessage = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Translucent white background
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2>Your cart is empty</h2>
      <p>Explore our products and add items to your cart.</p>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Explore Products
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCartMessage;
