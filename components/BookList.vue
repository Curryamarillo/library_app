<template>
  <div class="grid grid-cols-1 mt-20">
    <button class="p-2 my-2 mx-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-700" @click="openForm">
      Agregar Libro
    </button>
    <BookSearch v-model:search-term="searchTerm" />
    <template v-if="books.length > 0">
      <Book v-for="(book, index) in books" :key="index" :title="book.title" :author="book.author" :isbn="book.isbn"
        :isAvailable="book.isAvailable" @open-modal="openModal" />
    </template>
    <div v-else class="animate-ping">Cargando libros...</div>
    <BookModal :show="isModalOpen" @close="closeModal" @save="handleLoan" />
  </div>
  <BookForm :show="isFormOpen" @close="closeForm" @save="handleSaveBook" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchBooks, fetchBooksByTitleContaining, persistBookInDatabase } from '@/apis/fetchBooks';
import { useBookStore } from '@/stores/bookStore';
import { type IBook } from '~/types/IBooks';

const books = ref<IBook[]>([]);
const isModalOpen = ref(false);
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

onMounted(() => {
  loadBooks();
});

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
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function handleLoan() {
  const userId = 123; // Ejemplo de ID de usuario
  await bookStore.associateBookWithUser(userId);
  closeModal();
}

async function handleSaveBook(newBook: IBook) {
  try {
    console.log('Sending book data:', newBook);
    await persistBookInDatabase(newBook);
    books.value = await fetchBooks()
    closeForm();
  } catch (error) {
    console.error('Error persisting book in database:', error);
    // Handle the error here (e.g., display an error message)
  }
}

</script>

<style scoped>
/* Your styles here */
</style>
