import React, {useState} from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PurchaseForm from '../PurchaseForm/PurchaseForm';
import styles from './Book.module.css';

const Book = ({ book, onAddToCart }) => {
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => {
        setOpenForm(true);
      };
    
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    return  (
        <>
            <Card raised className={styles.bookContainer}>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                    <CardMedia
                        component='img'
                        height='180'
                        sx={{objectFit: 'contain'}}
                        className={styles.bookImage}               
                        image={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        onClick={handleOpenForm} // Open purchase form on image click
                    />
                )}
                <CardContent>
                    <Typography gutterBottom component="div" className={styles.titleContainer}>
                        <div className={styles.title} title={book.volumeInfo.title}>{book.volumeInfo.title}</div>
                        <IconButton onClick={(e) => { e.stopPropagation(); onAddToCart(book); }} color="primary">
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Typography>
                </CardContent>
        </Card>
        <PurchaseForm open={openForm} handleClose={handleCloseForm} />
      </>
    );
};

export default Book;