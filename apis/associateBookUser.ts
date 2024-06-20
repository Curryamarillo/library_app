const API_URL_BOOKS: string = "http://localhost:8080/books"

export async function associateBookWithUser(id: number, userId: number) {
    try {
      const response = await fetch(`${API_URL_BOOKS}/books/${id}`, {
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