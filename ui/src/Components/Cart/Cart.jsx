import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Typography, IconButton, Grid } from "@mui/material";
import { ShoppingCart, CheckCircle, Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import useSession from "../../Hooks/useSession";
import { AuthContext } from "../../Context/AuthContext";
import CartItems from "./CartItems";
import Payment from "../../Pages/Payment";
import EmptyCartMessage from "../../Pages/EmptyCartMessaage";
import { CartContext } from "../../Context/CartContext";
import OrderConfirmationModal from "../../Pages/OrderConfirmationModal";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);
  const sessionId = useSession();

  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const handleCloseOrderConfirmation = () => {
    setShowOrderConfirmation(false);
  };

  const handleDownloadInvoice = () => {
    
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
      session: sessionStorage.getItem('sessionId'),
      shippingAddress: orderDetails.shippingAddress,
      billingAddress: orderDetails.billingAddress,
    };

    const url = process.env.REACT_APP_BASE_URL;

    // Simulate API call to save order data
    fetch(url + '/api/carts/', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ` + accessToken,
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status} ${response.statusText}`);
      }
      return response.json(); // Parse the response JSON
    })
    .then((data) => {
      setPaymentDetails(data.paymentDetails);
      setShipmentDetails(data.shipmentDetails);
      setShowOrderConfirmation(true);
      toast("Order placed successfully", "info");
      setOrderPlaced(true);
      clearCart();
    })
    .catch((err) => {
      setError(err.message);
      toast(`Failed to place order: ${err.message}`, 'error');
    });
  };

  useEffect(() => {
    if (!sessionId) {
      redirectToHome();
    }
  }, [sessionId]);

  const redirectToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      {cartItems.length < 1 ? (
        <EmptyCartMessage />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Typography variant="h4" gutterBottom>
                <ShoppingCart fontSize="large" /> Cart Details
              </Typography>
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
              <Typography variant="h4" gutterBottom>
                Payment Details
              </Typography>
              <hr />
              <Payment proceedCheckout={proceedCheckout} />
            </div>
          </div>
        </div>
      )}

      {showOrderConfirmation && (
        <OrderConfirmationModal
          paymentDetails={paymentDetails}
          shipmentDetails={shipmentDetails}
          onClose={handleCloseOrderConfirmation}
          onDownloadInvoice={handleDownloadInvoice}
        />
      )}
    </>
  );
};

export default Cart;
