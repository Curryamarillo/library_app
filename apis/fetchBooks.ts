
const API_URL_BOOKS: string = "http://localhost:8080/books"

export const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL_BOOKS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  };

  
  