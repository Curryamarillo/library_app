const API_URL_LOANS: string = "http://localhost:8080/loans";

// Función para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Función para obtener las cabeceras con el token
const getHeaders = () => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Función para obtener los préstamos
export const fetchLoans = async () => {
  try {
    const response = await fetch(API_URL_LOANS, {
      headers: getHeaders(), // Añade las cabeceras con el token
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Devuelve los préstamos obtenidos
  } catch (error) {
    console.error("Error fetching loans:", error);
    throw error;
  }
};

export const fetchLoansByUserId = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL_LOANS}/user/${userId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Network Response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fecthing books by user ID ${userId}`, error);
    throw error;
  }
};
