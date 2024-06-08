// src/components/PageSizeSelector.js
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styles from './PageSizeSelector.module.css';

const PageSizeSelector = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <Box className={styles.container}>
      <FormControl variant="outlined" className={styles.selector}>
        <InputLabel>Page size</InputLabel>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          label="Page size"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PageSizeSelector;
