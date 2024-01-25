import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Modal,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CartContext } from "../Context/CartContext";

const Shipment = ({ onShipmentUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [sameAddresses, setSameAddresses] = useState(false);

  const { cartItems } = useContext(CartContext);

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleSave = () => {
    if(sameAddresses){
      setShippingAddress(billingAddress)
    }
    setModalOpen(false);

    onShipmentUpdate({
      billingAddress, shippingAddress
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleAddressChange = (add) => {
    setBillingAddress(add);
    if(sameAddresses){
      setShippingAddress(add);
    }
  }

  const handleCheckboxChange = () => {
    setSameAddresses((prevSame) => !prevSame);
    if (sameAddresses) {
      setShippingAddress(shippingAddress);
    } else {
      setShippingAddress(billingAddress);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, margin: 2 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Billing Address:</span>
            <span>{billingAddress || "Not specified"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Shipping Address:</span>
            <span>{shippingAddress || "Not specified"}</span>
          </div>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleCancel}
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
            minWidth: 300,
            borderRadius: 8,
          }}
        >
          <TextField
            variant="outlined"
            label="Billing Address"
            fullWidth
            value={billingAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            label="Shipping Address"
            fullWidth
            value={sameAddresses ? billingAddress : shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            disabled={sameAddresses}
            sx={{ marginBottom: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sameAddresses}
                onChange={handleCheckboxChange}
              />
            }
            label="Same as Billing Address"
            sx={{ marginBottom: 2 }}
          />
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button color="secondary" onClick={handleCancel} sx={{ marginLeft: 2 }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Shipment;
