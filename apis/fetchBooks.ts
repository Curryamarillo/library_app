import { type IBook } from "~/types/IBooks";

const API_URL_BOOKS: string = "http://localhost:8080/books";

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

export const fetchBooksByTitle = async (bookName: string) => {
  try {
    const response = await fetch(`${API_URL_BOOKS}/${bookName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const books = await response.json();
  } catch (error) {
    console.error('Error fetching books by title:', error);
  }
};

export const fetchBooksByTitleContaining = async (bookName: string) => {
  try {
    console.log(`Fetching books by title containing "${bookName}"...`);
    const response = await fetch(`${API_URL_BOOKS}/title/v2/${bookName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Books fetched by title "${bookName}":`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching books by title containing "${bookName}":`, error);
    throw error;
  }
};

export const persistBookInDatabase = async (newBook: IBook) => {
  try {
    const response = await fetch(`${API_URL_BOOKS}/create`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newBook), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const savedBookData = await response.json();
    console.log('Book saved successfully:', savedBookData);

  } catch (error) {
    console.error('Error persisting book in database:', error);
    throw error; 
  }
};
