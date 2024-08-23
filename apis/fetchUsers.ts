import type { IUser } from "~/types/IUser";

const API_URL_USERS = "http://localhost:8080/users";

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getHeaders = () => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const fetchUsers = async (page = 1, limit = 10): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL_USERS}?page=${page}&limit=${limit}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // La respuesta ya es un array de usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL_USERS}/${userId}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`${API_URL_USERS}/email/${email}`, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

export const persistUserInDatabase = async (newUser: IUser) => {
  try {
    const response = await fetch(`${API_URL_USERS}/create`, {
      method: `POST`,
      headers: getHeaders(), // Añade las cabeceras con el token
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const savedUserData = await response.json();
    console.log('User saved successfully:', savedUserData);
  } catch (error) {
    console.error('Error persisting in db:', error);
    throw error;
  }
};

export const updateUser = async (userId: number, updatedUser: IUser) => {
  try {
    const response = await fetch(`${API_URL_USERS}/${userId}`, {
      method: 'PUT',
      headers: getHeaders(), // Añade las cabeceras con el token
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating user with id: ${userId}`, error);
    throw error;
  }
};

export const deleteUserById = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL_USERS}/${userId}`, {
      method: 'DELETE',
      headers: getHeaders(), // Añade las cabeceras con el token
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error(`Error deleting user with id ${userId}:`, error);
    throw new Error('Ocurrió un error al intentar eliminar el usuario.');
  }
};
