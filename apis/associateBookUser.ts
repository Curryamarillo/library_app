const API_URL_ASSOCIATE_BOOK_USER: string = "http://localhost:8080/loans/create"
const API_URL_RETURN_LOAN: string = "http://localhost:8080/loans/return";
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
    const response = await fetch(`${API_URL_ASSOCIATE_BOOK_USER}`, {
      method: 'POST',
      headers: getHeaders(),
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
// Función para asociar un libro con un usuario
export async function returnLoan(userId: number, bookId: number) {
  try {
    const response = await fetch(`${API_URL_RETURN_LOAN}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userId, bookId })
    });
    if (!response.ok) {
      throw new Error('Error al devolver el libro: ${response.statusText}');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al devolver el libro:', error);
    throw error;
  }
}
