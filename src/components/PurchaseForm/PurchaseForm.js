// src/components/PurchaseForm.js
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import styles from './Purchase.module.css';

const PurchaseForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const handleSubmit = () => {
    const { name, phoneNumber, email, address } = formData;
    let isValid = true;

    // Name Validation
    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Invalid characters in name' }));
      isValid = false;
    }

    // Email Validation
    if (!email.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
      isValid = false;
    }

    // Phone Number Validation
    if (!phoneNumber.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: 'Phone Number is required' }));
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: 'Invalid phone number' }));
      isValid = false;
    }

    // Address Validation
    if (!address.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, address: 'Address is required' }));
      isValid = false;
    }

    if (isValid) {
      setShowThankYou(true);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.container}>
        {!showThankYou ? (
          <>
            <Typography variant="h6" gutterBottom>
              Purchase Form
            </Typography>
            <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth margin="normal" error={!!errors.name} helperText={errors.name} />
            <TextField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
            <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" error={!!errors.email} helperText={errors.email} />
            <TextField name="address" label="Address" value={formData.address} onChange={handleChange} fullWidth margin="normal" error={!!errors.address} helperText={errors.address} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!Object.values(errors).every((error) => !error)}>Submit Order</Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Thank You!
            </Typography>
            <Typography variant="body1">
              Your order has been submitted successfully.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PurchaseForm;
