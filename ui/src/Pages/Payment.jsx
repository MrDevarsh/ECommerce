import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Modal,
} from "@mui/material";
import {
  CloseOutlined,
  DescriptionOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { CartContext } from "../Context/CartContext";
import QrCode from "../Components/QR/QrCode";

const Payment = ({ proceedCheckout }) => {
  const { cartItems } = useContext(CartContext);

  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [sameAddresses, setSameAddresses] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const cartTotal = parseFloat(
    cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  ).toFixed(2);

  const taxRate = 0.18;
  const tax = parseFloat((cartTotal * taxRate).toFixed(2));

  const total = parseFloat(cartTotal) + parseFloat(tax);

  const handleCheckout = () => {
    proceedCheckout({
      cartTotal: cartTotal,
      tax: tax,
      total: total,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
    });
  };

  const handleAddressChange = (add) => {
    setBillingAddress(add);
    if (sameAddresses) {
      setShippingAddress(add);
    }
  };

  const handleCheckBox = (e) => {
    setSameAddresses(!sameAddresses);
    if (e) {
      setShippingAddress(billingAddress);
    }
  };

  return (
    <>
      {/* Shipment */}
      <Card sx={{ maxWidth: 300, margin: 2 }}>
        <CardContent>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <TextField
                  variant="outlined"
                  label="Billing Address"
                  fullWidth
                  value={billingAddress}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    startAdornment: <DescriptionOutlined />,
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <TextField
                  variant="outlined"
                  label="Shipping Address"
                  fullWidth
                  value={sameAddresses ? billingAddress : shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  disabled={sameAddresses}
                  required
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    startAdornment: <LocalShippingOutlined />,
                  }}
                />
              </div>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAddresses}
                  onClick={(e) => handleCheckBox(e.target.value)}
                />
              }
              label="Same as Billing Address"
              sx={{ marginBottom: 2 }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card sx={{ maxWidth: 300, margin: 2 }}>
        <CardContent>
          <div className="d-flex justify-content-between">
            <span>Cart Total:</span>
            <span>Rs. {cartTotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>GST (18%):</span>
            <span>Rs. {tax}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Total:</span>
            <span>Rs. {total}</span>
          </div>
          <div className="align-middle justify-content-center d-flex">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(!openModal)}
              disabled={
                billingAddress.trim() === "" || shippingAddress.trim() === ""
              }
              sx={{ marginTop: 2 }}
            >
              Proceed To Checkout
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={openModal}
        // onClose={handleCancel}
        sx={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        <Box
          sx={{
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
            width: 300,
            borderRadius: 8,
          }}
        > 
        <div className="text-end" sx={{"cursor": "pointer"}}>
                <CloseOutlined onClick={() => setOpenModal(!openModal)} />
            </div>
          <div className="container">
            
            <div className="row justify-content-center text-center ">
              <div className="col-md-12">
                <h2>Scan QR Code for Payment</h2>
              </div>

              <div className="col-md-12">
                <QrCode amount={total} />
              </div>
              <div className="col-md-12">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCheckout}
                  sx={{ marginTop: 2, marginBottom:2 }}
                >
                  Place Order
                </Button>
              </div>
              
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Payment;
