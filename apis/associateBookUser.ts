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

// Función para asociar un libro con un usuario
export async function associateBookWithUser(userId: number, bookId: number) {
  try {
    const response = await fetch(`${API_URL_BOOKS}/books/`, {
      method: 'POST',
      headers: getHeaders(), // Añade las cabeceras con el token
      body: JSON.stringify({ userId, bookId })
    });
    if (!response.ok) {
      throw new Error('Error al asociar el libro: ${response.statusText}');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al asociar el libro:', error);
    throw error;
  }
}
