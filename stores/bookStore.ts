// stores/bookStore.ts
import { defineStore } from 'pinia';
import { associateBookWithUser } from '@/apis/bookApi';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
}

interface BookStoreState {
  selectedBook: Book | null;
}

export const useBookStore = defineStore('bookStore', {
  state: (): BookStoreState => ({
    selectedBook: null
  }),
  actions: {
    selectBook(book: Book) {
      this.selectedBook = book;
    },
    async associateBookWithUser(userId: number) {
      if (this.selectedBook) {
        try {
          const updatedBook = await associateBookWithUser(this.selectedBook.id, userId);
          this.selectedBook.isAvailable = false;
          this.updateSelectedBook(updatedBook);
        } catch (error) {
          console.error('Error al asociar el libro:', error);
        }
      }
    },
    updateSelectedBook(updatedBook: Book) {
      this.selectedBook = updatedBook;
    }
  }
});






