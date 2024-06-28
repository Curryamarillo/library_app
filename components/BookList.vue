<template>
  <div class="grid grid-cols-1 mt-20">
    <button class="p-2 my-2 mx-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-700" @click="openForm">
      Agregar Libro
    </button>
    <BookSearch v-model:search-term="searchTerm" />
    <template v-if="books.length > 0">
      <Book
        v-for="(book, index) in books"
        :key="index"
        :id="book.id"
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
    <BookEditForm :show="isEditFormOpen" :book="selectedBook" @close="closeEditForm" @save="updatedBook" />
  </div>

</template>

<script setup lang="ts">
import { fetchBooks, fetchBooksByTitleContaining, updateBook, persistBookInDatabase } from '@/apis/fetchBooks';
import { type IBook } from '~/types/IBooks';

const books:Ref<IBook[]> = ref<IBook[]>([]);
const isModalOpen = ref(false);
const isEditFormOpen = ref(false);
const selectedBook = ref<IBook | null>(null);

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

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};


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


onMounted(loadBooks);

watch(searchTerm, async (newValue) => {
  await searchBooks(newValue);
});

const updatedBook = async (updatedBook: IBook) => {
  try {
    await updateBook(updatedBook.id, updatedBook); // Pasa el libro completo
    closeEditForm(); // Cierra el formulario de edición después de actualizar
    await loadBooks(); // Vuelve a cargar la lista de libros después de la actualización
  } catch (error) {
    console.error('Error updating book:', error);
    // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje al usuario
  }
};


</script>

<style scoped>
/* Estilos específicos del componente BookList.vue */
</style>

