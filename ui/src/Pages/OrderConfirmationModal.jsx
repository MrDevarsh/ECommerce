import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const OrderConfirmationModal = ({ paymentDetails, shipmentDetails, onClose, onDownloadInvoice }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{paymentDetails}</p>
        <p>{shipmentDetails}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onDownloadInvoice}>
          Download Invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmationModal;
