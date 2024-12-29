import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ show, onClose, onConfirm, message = "Are you sure you want to delete this item?" }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
