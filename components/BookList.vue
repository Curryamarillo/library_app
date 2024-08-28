<template>
  <div class="flex flex-col h-screen">
    <div class="bg-green-900 pt-20">
    </div>
    <div class="relative grid mx-4 sm:grid-cols-2 grid-cols-1 pt-5 bg-green-900">
      <button class="p-4 sm:p-1 my-2 mx-2 sm:mx-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-700"
        @click="openForm">
        Agregar Libro
      </button>
      <BookSearch v-model:search-term="searchTerm" />
    </div>
    <div class="flex-grow overflow-y-auto p-4">
      <template v-if="books.length > 0">
        <Book v-for="(book, index) in books" :key="index" :id="book.id" :title="book.title" :author="book.author"
          :isbn="book.isbn" :isAvailable="book.isAvailable" @open-modal="openModal(book)"
          @open-edit="openEditForm(book)" @open-delete="openDeleteModal(book)" />
      </template>
      <div v-else class="animate-ping">Cargando libros...</div>
    </div>
    <!-- Se pasa bookId y bookName solo si selectedBook está definido -->
    <BookModal 
      v-if="selectedBook"
      :show="isModalOpen" 
      :book-id="selectedBook?.id!" 
      :book-name="selectedBook?.title!" 
      @close="closeModal" 
      @save="handleLoanBook(selectedBook?.id!)" 
    />
    <BookForm :show="isFormOpen" @close="closeForm" @save="handleSaveBook" />
    <BookEditForm :show="isEditFormOpen" :book="selectedBook" @close="closeEditForm" @save="updatedBook" />
    <BookDeleteModal :show="isDeteleModalOpen" :book="selectedBook" @close-delete-book="closeDeleteModal"
      @delete-book="handleDeleteBook" />
  </div>
</template>

<script setup lang="ts">
import { fetchBooks, fetchBooksByTitleContaining, updateBook, persistBookInDatabase, deleteBook } from '@/apis/fetchBooks';
import { associateBookWithUser } from '~/apis/associateBookUser';
import { type IBook } from '~/types/IBooks';

const books: Ref<IBook[]> = ref<IBook[]>([]);
const isModalOpen = ref(false);
const isEditFormOpen = ref(false);
const selectedBook = ref<IBook | null>(null);
const isDeteleModalOpen = ref(false);
const searchTerm = ref('');
const isFormOpen = ref(false);

const loadBooks = async () => {
  try {
    books.value = await fetchBooks();
  } catch (error) {
    console.error('Error loading books:', error);
  }
};

const searchBooks = async (value: string) => {
  try {
    if (value === '') {
      books.value = await fetchBooks();
    } else {
      books.value = await fetchBooksByTitleContaining(value);
    }
  } catch (error) {
    console.error('Error searching books:', error);
  }
};

const openForm = () => {
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const openModal = (book: IBook) => {
  selectedBook.value = book;
  isModalOpen.value = true;
  console.log("Valor que se pasa al modal en OpenModal " + JSON.stringify(selectedBook.value));
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedBook.value = null;  // Restablece el libro seleccionado al cerrar el modal
};

const openEditForm = (book: IBook) => {
  selectedBook.value = book;
  isEditFormOpen.value = true;
};

const closeEditForm = () => {
  selectedBook.value = null;
  isEditFormOpen.value = false;
};

const openDeleteModal = (book: IBook) => {
  selectedBook.value = book;
  isDeteleModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeteleModalOpen.value = false;
};

const handleSaveBook = async (newBook: IBook) => {
  try {
    await persistBookInDatabase(newBook);
    isFormOpen.value = false;
    await loadBooks();
  } catch (error) {
    console.error('Error saving book:', error);
  }
};

const handleLoanBook = async (bookId: number) => {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      console.error("User not found in localStorage");
      return;
    }
    const userObject = JSON.parse(user);
    console.log("User ID: " + userObject.id);
    console.log("Book ID: " + bookId);

    await associateBookWithUser(userObject.id, bookId);
    selectedBook.value!.isAvailable = false;
    await loadBooks();
    closeModal();
  } catch (error) {
    console.error("Error in book loan association", error);
  }
};

onMounted(loadBooks);

watch(searchTerm, async (newValue) => {
  await searchBooks(newValue);
});

const updatedBook = async (updatedBook: IBook) => {
  try {
    await updateBook(updatedBook.id, updatedBook);
    closeEditForm();
    await loadBooks();
  } catch (error) {
    console.error('Error updating book:', error);
  }
};

const handleDeleteBook = async (selectedBook: IBook) => {
  try {
    await deleteBook(selectedBook.id);
    books.value = books.value.filter(book => book.id !== selectedBook.id);
    closeDeleteModal();
  } catch (error) {
    console.error('Error deleting book', error);
  }
}
</script>

<style scoped>
/* Estilos específicos del componente BookList.vue */
</style>
