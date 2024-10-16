/* eslint-disable react/prop-types */
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <button className="float-right" onClick={onClose}>
          &times;
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;