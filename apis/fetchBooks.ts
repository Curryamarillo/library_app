import { type IBook } from "~/types/IBooks";

const API_URL_BOOKS: string = "http://localhost:8080/books";

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Función para obtener las cabeceras con el token
const getHeaders = () => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/*
* API´s to manage books:
* fetchBooks to fetch all books
* fetchBookById to fetch a book by id
*/
export const fetchBooks = async () => {
  try {
    const response = await fetch(API_URL_BOOKS, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
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
    const response = await fetch(`${API_URL_BOOKS}/${bookId}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
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
    const response = await fetch(`${API_URL_BOOKS}/${bookName}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const books = await response.json();
    return books; // Devuelve los libros encontrados
  } catch (error) {
    console.error('Error fetching books by title:', error);
  }
};

export const fetchBooksByTitleContaining = async (bookName: string) => {
  try {
    console.log(`Fetching books by title containing "${bookName}"...`);
    const response = await fetch(`${API_URL_BOOKS}/title/v2/${bookName}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
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
      headers: getHeaders(), // Añade las cabeceras con el token
      body: JSON.stringify(newBook), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const savedBookData = await response.json();
    console.log('Book saved successfully:', savedBookData);
    return savedBookData; // Devuelve el libro guardado

  } catch (error) {
    console.error('Error persisting book in database:', error);
    throw error; 
  }
};

export const updateBook = async (bookId: number, updatedBook: IBook) => {
  try {
    const response = await fetch(`${API_URL_BOOKS}/${bookId}`, {
      method: 'PUT',
      headers: getHeaders(), // Añade las cabeceras con el token
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating book with ID ${bookId}:`, error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL_BOOKS}/${bookId}`, {
      method: 'DELETE',
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error(`Error deleting book with id: ${bookId}:`, error);
    throw new Error('Ocurrió un error al intentar eliminar el libro.');
  }
}

