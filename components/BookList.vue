<template>
  <div class="flex flex-wrap items-center">
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
import { fetchBooks } from '@/apis/bookApi';
import { useBookStore } from '@/stores/bookStore';

interface Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
}

const books = ref<Book[]>([]);
const isModalOpen = ref(false);
const bookStore = useBookStore();

const loadBooks = async () => {
  try {
    books.value = await fetchBooks();
    console.log(books.value);
  } catch (error) {
    console.error('Error loading books:', error);
  }
};

onMounted(() => {
  loadBooks();
});

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function handleSave() {
  const userId = 123; // Aquí pondrías el ID del usuario que obtendrás de algún otro lado
  await bookStore.associateBookWithUser(userId);
  closeModal();
}
</script>

<style scoped>
/* Agrega cualquier estilo necesario aquí */
</style>
