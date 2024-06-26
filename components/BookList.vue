<template>
  <div class="grid grid-cols-1 mt-20">
    <BookAdd />
    <BookSearch v-model:search-term="searchTerm" />
    <template v-if="books.length > 0">
      <Book
        v-for="(book, index) in books"
        :key="index"
        :title="book.title"
        :author="book.author"
        :isbn="book.isbn"
        :isAvailable="book.isAvailable"
        @open-modal="openModal"
      />
    </template>
    <div v-else class="animate-ping">Cargando libros...</div>
    <BookModal :show="isModalOpen" @close="closeModal" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchBooks, fetchBooksByTitleContaining } from '@/apis/fetchBooks';
import { useBookStore } from '@/stores/bookStore';
import { type IBook } from '~/types/IBooks';

const books = ref<IBook[]>([]);
const isModalOpen = ref(false);
const bookStore = useBookStore();
const searchTerm = ref('');

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

// Watch for changes in searchTerm and reload books
watch(searchTerm, async (newValue) => {
  await searchBooks(newValue);
});

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function handleSave() {
  const userId = 123; // Ejemplo de ID de usuario
  await bookStore.associateBookWithUser(userId);
  closeModal();
}
</script>

<style scoped>
/* Your styles here */
</style>


