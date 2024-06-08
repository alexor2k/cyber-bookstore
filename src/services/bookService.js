import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes'; // get this param from environment variable

const getBooks = async (query, page, itemsPerPage) => {
  try {
    const maxResultsPerRequest = 40;
    const startIndex = page - 1 === 0 ? (page - 1) * itemsPerPage : ((page - 1) * itemsPerPage) - 1;

    let results = itemsPerPage < maxResultsPerRequest ? await getDataFromApi(query, startIndex, itemsPerPage) : 
    await getDataFromApi(query, startIndex, maxResultsPerRequest);
    debugger;
    if (itemsPerPage > maxResultsPerRequest) {
        const additionalResults = await getDataFromApi(query, startIndex + maxResultsPerRequest, itemsPerPage - maxResultsPerRequest);
        return(results.concat(additionalResults));
    }
  return results;
  } catch (error) {
    console.error("Error getting data: ", error);
    return [];
  }
};

const getDataFromApi  = async (query, startIndex, itemsPerPage) => {
    try {
      const response = await axios.get(`${API_URL}?q=${query}&startIndex=${startIndex}&maxResults=${itemsPerPage}`);
      return response.data.items || [];
    } catch (error) {
      console.error("Error getting data: ", error);
      return [];
    }
  };

export const bookService = {
    getBooks    
  };