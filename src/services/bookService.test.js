import axios from 'axios';
import { bookService } from './bookService'; // Adjust the path as necessary

jest.mock('axios');

describe('bookService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    data: {
      items: [{ id: 1, title: 'Test Book' }]
    }
  };

  it('should return results from the API', async () => {
    axios.get.mockResolvedValue(mockData);

    const result = await bookService.getBooks('test', 1, 10);

    expect(result).toEqual(mockData.data.items);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    const result = await bookService.getBooks('test', 1, 10);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should request the correct URL with query, startIndex, and maxResults', async () => {
    axios.get.mockResolvedValue(mockData);

    await bookService.getBooks('test', 2, 5);

    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes?q=test&startIndex=4&maxResults=5');
  });

  it('should request additional results if itemsPerPage is greater than maxResultsPerRequest', async () => {
    axios.get.mockResolvedValue(mockData);

    const result = await bookService.getBooks('test', 1, 50);

    expect(result).toEqual([...mockData.data.items, ...mockData.data.items]);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  it('should calculate the correct startIndex for the first page', async () => {
    axios.get.mockResolvedValue(mockData);

    await bookService.getBooks('test', 1, 10);

    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes?q=test&startIndex=0&maxResults=10');
  });

  it('should calculate the correct startIndex for subsequent pages', async () => {
    axios.get.mockResolvedValue(mockData);

    await bookService.getBooks('test', 3, 10);

    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes?q=test&startIndex=19&maxResults=10');
  });

  it('should handle an empty response from the API', async () => {
    axios.get.mockResolvedValue({ data: {} });

    const result = await bookService.getBooks('test', 1, 10);

    expect(result).toEqual([]);
  });

  it('should handle missing items in the API response', async () => {
    axios.get.mockResolvedValue({ data: { items: null } });

    const result = await bookService.getBooks('test', 1, 10);

    expect(result).toEqual([]);
  });
 
});
