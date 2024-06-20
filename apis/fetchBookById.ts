const API_URL_BOOK_BY_ID: string = "http://localhost:8080/books";

export const fetchBookById = async (bookId: number) => {
  try {
    const response = await fetch(`${API_URL_BOOK_BY_ID}/${bookId}`);
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
