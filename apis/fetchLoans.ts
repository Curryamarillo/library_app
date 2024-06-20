const API_URL_LOANS: string = "http://localhost:8080/loans"

export const fetchLoans = async () => {
  try {
    const response = await fetch(API_URL_LOANS);
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};
