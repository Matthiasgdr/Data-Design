import React from "react";
// import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, crypto }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="back" onClick={onClose}></div>
      <div className="modal"></div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
