import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import CartItems from "./CartItems";
import "./Cart.css";
import Payment from "../../Pages/Payment";
import EmptyCartMessage from "../../Pages/EmptyCartMessaage";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSession from "../../Hooks/useSession";

const Cart = () => {

  // session check
  const sessionId = useSession();

  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState();

  // Load cart data from sessionStorage on component mount
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [setCartItems]);

  const saveCartToLocalStorage = (cartData) => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartData));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const proceedCheckout = (orderDetails) => {
    const data = {
      cartValue: orderDetails.cartTotal,
      tax: orderDetails.tax,
      cartTotal: orderDetails.total,
      cartItems: cartItems,
      session: sessionStorage.getItem('sessionId')
    };

    const url = process.env.REACT_APP_BASE_URL

    // Simulate API call to save order data
    fetch(url + '/api/carts/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Order placed successfully", "info");
        setOrderPlaced(true);
        // Clear the cart after placing the order
        clearCart();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const redirectToHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (!sessionId) {
      redirectToHome();
    }
  }, [sessionId]);

  return (
    <>
      {cartItems.length < 1 ? (
        <EmptyCartMessage />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Cart Details</h1>
              <hr />

              <div className="cart-items">
                {cartItems.map((item, i) => (
                  <CartItems
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    qty={item.qty}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <h1>Payment Details</h1>
              <hr />
              <Payment proceedCheckout={proceedCheckout} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
