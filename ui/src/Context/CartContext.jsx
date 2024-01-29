import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    const data = (storedCartItems ? JSON.parse(storedCartItems) : []);
    return data
  });

  const addToCart = (productID) => setCartItems([...cartItems, productID]);

  const clearCart = () => {
    setCartItems([]);
  };

  // useEffect(() => {
  //   const storedCartItems = sessionStorage.getItem("cartItems");
  //   setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
  // }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
