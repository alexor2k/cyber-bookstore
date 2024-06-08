import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Book from '../../components/Book/Book';
import Pagination from '../../components/Pagination/Pagination';
import PageSizeSelector from '../../components/PageSizeSelector/PageSizeSelector';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cart from '../../components/Cart/Cart';
import Notification from '../../components/Notification/Notification';
import styles from './Books.module.css';
import {bookService} from '../../services/bookService';

const Books = () => { 

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('cyber');
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        getBooks();       
    }, [page, query, itemsPerPage]);   

    const getBooks = async () => {        
        try {
          const books = await bookService.getBooks(query, page, itemsPerPage);
          setBooks(books|| []);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
          console.error("Error getting books: ", error);
        }
    };   
    
    const handleSearch = (newQuery) => {
        if (query !== newQuery) {
            setPage(1);  // Reset page count to 1 for new searches            
        }
        setQuery(newQuery);        
        
    };

    const toggleCart = () => {
        setCartOpen((prevCartOpen) => !prevCartOpen);
    };

    const showNotification = (message, type) =>{
        debugger;
        setAlertMessage(message);
        setAlertType(type);
        setAlertOpen(true);
    }

    const handleAddToCart = (book) => {
        setCartItems((prevCartItems) => {
            const exists = prevCartItems.some((item) => item.id === book.id);
            debugger;
            if (exists) {
                showNotification('This book is already in the cart.', 'warning')
                return prevCartItems;
            }else {
                showNotification('The book was added to the cart', 'success')
            }

            return [...prevCartItems, book];
          });
    };

    const handleRemoveFromCart = (bookId) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== bookId));
    };    

    const handleNotificationClose = () => {
        setAlertOpen(false);
    };

    return (          
        <Container>
            <div className={styles.searchContainer}>
                <SearchBar setQuery={handleSearch} />
                <IconButton color="primary" onClick={toggleCart} className={styles.cartIconContainer}>
                    <ShoppingCartIcon />
                </IconButton>
            </div>
            <Grid container spacing={2} justifyContent="left">
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <Book book={book} onAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={styles.paginationContainer}>
                <Pagination page={page} setPage={setPage} itemsPerPage={itemsPerPage} />   
                <PageSizeSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />    
            </div>
            <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} open={cartOpen} onClose={toggleCart} />
            <Notification open={alertOpen} message={alertMessage} type={alertType} onClose={handleNotificationClose}/>
        </Container>
      );
}

export default Books;