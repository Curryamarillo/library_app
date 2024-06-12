// src/apis/bookApi.ts
const URL_DE_TU_API: string = "http://localhost:8080/books"

export const fetchBooks = async () => {
    try {
      const response = await fetch(URL_DE_TU_API);
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

  export async function associateBookWithUser(id: number, userId: number) {
    try {
      const response = await fetch(`${URL_DE_TU_API}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      if (!response.ok) {
        throw new Error('Error al asociar el libro');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al asociar el libro:', error);
      throw error;
    }
  }
  