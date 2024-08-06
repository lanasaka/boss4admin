import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';

const ConfirmationModal = ({ show, onHide, onConfirm, userName, message }) => {
  return (
    <CModal show={show} onClose={onHide}>
      <CModalHeader closeButton>Confirm Delete</CModalHeader>
      <CModalBody>
        {message || `Are you sure you want to delete ${userName}?`}
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onConfirm}>
          Confirm
        </CButton>
        <CButton color="secondary" onClick={onHide}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmationModal;
