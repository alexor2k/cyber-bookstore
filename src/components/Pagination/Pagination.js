import React from 'react';
import { Box, Button } from '@mui/material';
import styles from './Pagination.module.css';

const Pagination = ({ page, setPage }) => {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <Box className={styles.container}>
      <Button variant="contained" onClick={handlePrevious} disabled={page === 1}>
        Previous
      </Button>
      <Box className={styles.text}>
        Page {page}
      </Box>
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;