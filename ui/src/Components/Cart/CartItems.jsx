import React, { useContext, useState } from "react";
import {
  AddOutlined,
  DeleteOutline,
  RemoveOutlined,
} from "@mui/icons-material";
import {
  TextField,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Button,
  Box,
} from "@mui/material";
import { CartContext } from "../../Context/CartContext";

const CartItems = (props) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = () => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === props.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = () => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === props.id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleChangeQuantity = (e) => {
    const newValue = parseInt(e.target.value, 10) || 1;

    const updatedCartItems = cartItems.map((item) =>
      item.id === props.id ? { ...item, qty: newValue } : item
    );

    setCartItems(updatedCartItems);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmRemoveItem = () => {
    const updatedCartItems = cartItems.filter((item) => item.id !== props.id);
    setCartItems(updatedCartItems);
    closeModal();
  };

  return (
    <Card sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.image}
        sx={{ flexShrink: 0, width: "40%" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative", // Add position relative for absolute positioning
        }}
      >
        <span className="fw-bold fs-5">{props.name}</span>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="align-middle">Qty:</span>
          <RemoveOutlined onClick={handleDecrement} />
          <TextField
            type="tel"
            value={props.qty}
            variant="outlined"
            size="small"
            onChange={(e) => handleChangeQuantity(e)}
            sx={{
              width: "80px",
              textAlign: "center",
              marginX: "4px",
            }}
          />
          <AddOutlined onClick={handleIncrement} />
        </div>
        <div>
          Price: <span className="fw-bold text-danger">₹ {props.price * props.qty}</span>
        </div>
      </CardContent>
      <CardContent sx={{ marginLeft: "auto" }}>
        <IconButton className="delete-icon" onClick={openModal}>
          <DeleteOutline className="text-danger" />
        </IconButton>
      </CardContent>

      {/* Modal for Confirmation */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "1px solid #000",
            p: 2,
          }}
        >
          <p>Are you sure you want to remove {props.name} from the cart?</p>
          <Button onClick={confirmRemoveItem}>Yes</Button>
          <Button onClick={closeModal} color="secondary">No</Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default CartItems;
