import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Button } from "@mui/material";
import { ShoppingBagOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import './Products.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = (props) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(cartItems.some((item) => item.id === props.id));
  }, [cartItems, props]);

  const handleClick = (product) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);

    if (!isAlreadyInCart) {
      const prodDetails = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1,
      };

      setCartItems([...cartItems, prodDetails]);
      setAdded(true);

      toast("Product has been added in the cart", 'alert');
    }
  };

  return (
    <div className="card p-0">
      <Card
      sx={{
        maxWidth: 300,
        height: "100%",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        paddingBottom: 0,
        marginBottom: 0,
      }}
    >
      <CardMedia
        component="img"
        alt={props.name}
        height="200"
        image={props.image}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <p
          style={{
            marginBottom: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {props.name}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="product-price">Rs. {props.price}</div>
        </div>
      </CardContent>
      <CardContent>
        <div className="add-to-cart">
          {added ? (
            <Link to="/cart">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartOutlined />}
              >
                Go to Cart
              </Button>
            </Link>
          ) : (
            <ShoppingBagOutlined
              onClick={() => handleClick(props)}
              sx={{
                cursor: "pointer",
                fontSize: "35px",
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default Products;
