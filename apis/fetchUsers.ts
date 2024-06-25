const API_URL_USERS = "http://localhost:8080/users";

export const fetchUsers = async (page = 1, limit = 10): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL_USERS}?page=${page}&limit=${limit}`);
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
    const response = await fetch(`${API_URL_USERS}/${userId}`);
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