// src/components/Cart.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Cart.module.css';

const Cart = ({ cartItems, onRemoveFromCart, open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ p: 2 }} className={styles.container}>
        <Typography variant="h6" gutterBottom>
          Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar src={item.volumeInfo.imageLinks?.thumbnail} />
              </ListItemAvatar>
              <ListItemText primary={item.volumeInfo.title} />
              <IconButton onClick={() => onRemoveFromCart(item.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </Box>
    </Drawer>
  );
};

export default Cart;
