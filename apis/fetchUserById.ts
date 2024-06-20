const API_URL_USER_BY_ID: string = "http://localhost:8080/users";

export const fetchUserById = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL_USER_BY_ID}/${userId}`);
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
