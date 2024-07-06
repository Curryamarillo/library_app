// stores/bookStore.ts
import { defineStore } from 'pinia';
import { associateBookWithUser } from '@/apis/associateBookUser';
import { type IBook } from '~/types/IBooks';

interface BookStoreState {
  selectedBook: IBook | null;
}

export const useBookStore = defineStore('bookStore', {
  state: (): BookStoreState => ({
    selectedBook: null
  }),
  actions: {
    selectBook(book: IBook) {
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
    updateSelectedBook(updatedBook: IBook) {
      this.selectedBook = updatedBook;
    }
  }
});






