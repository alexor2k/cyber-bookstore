import React, { useState, useEffect } from 'react';
import {  Snackbar, Alert } from '@mui/material';

const Notification = ({open, message, type, onClose}) => { 

    const [snackbarOpen, setSnackbarOpen] = useState(open);
  
    useEffect(() => {
        setSnackbarOpen(open);
      }, [open]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        onClose();
    };

    return (
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleSnackbarClose} severity={type}>
               {message}
            </Alert>
        </Snackbar>
    );
}; 

export default Notification;