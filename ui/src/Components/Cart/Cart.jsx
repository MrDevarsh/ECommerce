import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import CartItems from "./CartItems";
import "./Cart.css";
import Payment from "../../Pages/Payment";
import Shipment from "../../Pages/Shipment";
import EmptyCartMessage from "../../Pages/EmptyCartMessaage";
import Error from "../../Pages/Error";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const proceedCheckout = (orderDetails) => {
    console.log("checkout");
    // Create the order payload
    const data = {
      cartValue: orderDetails.cartTotal,
      tax: orderDetails.tax,
      cartTotal: orderDetails.total,
      cartDetails: cartItems
    };

    // Make a POST request to your backend to process the order
    fetch('http://localhost:8000/api/carts/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        // For example, you might show a success message or redirect to a thank you page
        console.log("Order placed successfully:", data);
        setOrderPlaced(true);
        // Clear the cart after placing the order
        clearCart();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };


    if(error){
        <Error message={error} />
    }

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
                {cartItems.map((item, i) => {
                  return (
                    <CartItems
                      key={i}
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      qty={item.qty}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-md-4">
              <h1>Payment Details</h1>
              <hr />
              {/* <Shipment onShipmentUpdate= {handleShipmentUpdate}/> */}
              <Payment proceedCheckout={proceedCheckout} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
