import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import styles from './SearchBar.module.css';

const SearchBar = ({ setQuery}) => {
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        let adjustedSearchText = `cyber${searchText ? '+'+searchText: ''}`;  
        setQuery(adjustedSearchText);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, setQuery]);

  const handleTextChange = (e) => {    
    e.preventDefault();
    setSearchText(e.target.value);    
  };

  return (
    <Box className={styles.container}>
      <TextField
        label="Search for cyber books..."
        variant="outlined"
        value={searchText}
        onChange={(e) => handleTextChange(e)}        
        className={styles.text}
        InputProps={{
            endAdornment: (
              <InputAdornment>                
                  <SearchIcon />               
              </InputAdornment>
            )
          }}
      />     
    </Box>
  );
};

export default SearchBar;