import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productID) => setCartItems([...cartItems, productID]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
