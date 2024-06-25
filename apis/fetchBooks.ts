
const API_URL_BOOKS: string = "http://localhost:8080/books"

/*
* API´S to manage books:
* fetchBook to fetch all books
* fetchBookById to fetch a book by id
*/
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
  export const fetchBookById = async (bookId: number) => {
    try {
      const response = await fetch(`${API_URL_BOOKS}/${bookId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error);
      throw error;
    }
  };

  
  
  