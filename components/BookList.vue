<template>
  <div class="grid grid-cols-1 mt-20">
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
import { fetchBooks } from '@/apis/fetchBooks';
import { useBookStore } from '@/stores/bookStore';
import { type IBook } from '~/types/IBooks';


let books:Ref<IBook[]> = ref<IBook[]>([]);
let isModalOpen:Ref<boolean> = ref(false);
let bookStore = useBookStore();

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
  // TODO At UserStore match Loan with UserId and BookId
  const userId = 123; 
  await bookStore.associateBookWithUser(userId);
  closeModal();
}
</script>

<style scoped>

</style>

