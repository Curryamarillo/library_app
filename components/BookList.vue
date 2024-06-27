<template>
  <div class="grid grid-cols-1 mt-20">
    <button class="p-2 my-2 mx-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-700" @click="openForm">
      Agregar Libro
    </button>
    <BookSearch v-model:search-term="searchTerm" />
    <template v-if="books.length > 0">
<<<<<<< HEAD
      <Book
        v-for="(book, index) in books"
        :key="index"
        :title="book.title"
        :author="book.author"
        :isbn="book.isbn"
        :isAvailable="book.isAvailable"
        @open-modal="openModal"
        @open-edit="openEditForm(book)"
      />
    </template>
    <div v-else class="animate-ping">Cargando libros...</div>
    <BookModal :show="isModalOpen" @close="closeModal" @save="" />
    <BookForm :show="isFormOpen" @close="closeForm" @save="handleSaveBook" />
    <BookEditForm :show="isEditFormOpen" :book="selectedBook" @close="closeEditForm" @save="handleEditSaveBook" />
=======
      <Book v-for="(book, index) in books" :key="index" :title="book.title" :author="book.author" :isbn="book.isbn"
        :isAvailable="book.isAvailable" @open-modal="openModal" />
    </template>
    <div v-else class="animate-ping">Cargando libros...</div>
    <BookModal :show="isModalOpen" @close="closeModal" @save="handleLoan" />
>>>>>>> ff47645aca8a566fa4ba196f2f99ba49f1a5ab08
  </div>
  <BookForm :show="isFormOpen" @close="closeForm" @save="handleSaveBook" />
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, onMounted } from 'vue';
import { fetchBooks,fetchBooksByTitleContaining, updateBook, persistBookInDatabase} from '@/apis/fetchBooks';
=======
import { fetchBooks, fetchBooksByTitleContaining, persistBookInDatabase } from '@/apis/fetchBooks';
>>>>>>> ff47645aca8a566fa4ba196f2f99ba49f1a5ab08
import { useBookStore } from '@/stores/bookStore';
import { type IBook } from '~/types/IBooks'; // Ajusta la importación según la estructura de tu proyecto

const books = ref<IBook[]>([]);
const isModalOpen = ref(false);
const isFormOpen = ref(false);
const isEditFormOpen = ref(false);
const selectedBook = ref<IBook | null>(null);
const bookStore = useBookStore();
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

<<<<<<< HEAD
const closeForm = () => {
  isFormOpen.value = false;
};

const openModal = () => {
=======
watch(searchTerm, async (newValue) => {
  await searchBooks(newValue);
});

function closeForm() {
  isFormOpen.value = false;
}

function openForm() {
  isFormOpen.value = true;
}

function openModal() {
>>>>>>> ff47645aca8a566fa4ba196f2f99ba49f1a5ab08
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

<<<<<<< HEAD
const openEditForm = (book: IBook) => {
  selectedBook.value = book;
  isEditFormOpen.value = true;
};

const closeEditForm = () => {
  selectedBook.value = null;
  isEditFormOpen.value = false;
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

const handleEditSaveBook = async (bookId: number, updatedBook: IBook) => {
  try {
    await updateBook(bookId, updatedBook);
    isEditFormOpen.value = false;
    await loadBooks();
  } catch (error) {
    console.error('Error updating book:', error);
  }
};

onMounted(loadBooks);
</script>

<style scoped>
/* Estilos específicos del componente BookList.vue */
</style>
=======
async function handleLoan() {
  const userId = 123; // Ejemplo de ID de usuario
  await bookStore.associateBookWithUser(userId);
  closeModal();
}

async function handleSaveBook(newBook: IBook) {
  try {
    await persistBookInDatabase(newBook);
    books.value = await fetchBooks()
  } catch (error) {
    console.error('Error persisting book in database:', error);
  }
}

</script>

<style scoped></style>
>>>>>>> ff47645aca8a566fa4ba196f2f99ba49f1a5ab08
