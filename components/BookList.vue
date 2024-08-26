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
          :isbn="book.isbn" :isAvailable="book.isAvailable" @open-modal="openModal" @open-edit="openEditForm(book)"
          @open-delete="openDeleteModal(book)" />
      </template>
      <div v-else class="animate-ping">Cargando libros...</div>
    </div>
    <BookModal :show="isModalOpen" :book="selectedBook" @close="closeModal" @save="handleLoanBook" />
    <BookForm :show="isFormOpen" @close="closeForm" @save="handleSaveBook" />
    <BookEditForm :show="isEditFormOpen" :book="selectedBook" @close="closeEditForm" @save="updatedBook" />
    <BookDeleteModal :show="isDeteleModalOpen" :book="selectedBook" @close-delete-book="closeDeleteModal"
      @delete-book="handleDeleteBook" />
  </div>
</template>


<script setup lang="ts">
import { fetchBooks, fetchBooksByTitleContaining, updateBook, persistBookInDatabase, deleteBook } from '@/apis/fetchBooks';
import { associateBookWithUser } from '~/apis/associateBookUser';
import { fetchUserByEmail } from '~/apis/fetchUsers';
import { type IBook } from '~/types/IBooks';


const books: Ref<IBook[]> = ref<IBook[]>([]);
const isModalOpen = ref(false);
const isEditFormOpen = ref(false);
const selectedBook = ref<IBook | null>(null);
const isDeteleModalOpen = ref(false);
const searchTerm = ref('');
const isFormOpen = ref(false);

const loadUser = async (): Promise<number | null> => {
  const userEmail = localStorage.getItem('logguedUser');
  if (!userEmail) {
    console.error('No se encontró el email del usuario en localStorage.');
    return null;
  }

  try {
    const response = await fetchUserByEmail(userEmail);
    const { id: userId } = response;
    return userId;
  } catch (error) {
    console.error('Error fetching userByEmail', error);
    return null;
  }
}

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
    const userId = await loadUser();

    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario.');
    }

    // Verifica que selectedBook esté definido
    if (!selectedBook.value) {
      throw new Error('No se encontró el libro seleccionado.');
    }

    // Asociar el libro con el usuario
    await associateBookWithUser(userId, bookId);

    // Actualiza el estado del libro para reflejar que ya no está disponible
    const updatedBook = { ...selectedBook.value, isAvailable: false };
    await updateBook(updatedBook.id!, updatedBook); // Usar '!' para indicar que id no es undefined

    // Recargar la lista de libros
    await loadBooks();
    closeModal();
  } catch (error) {
    console.error('Error al realizar el préstamo del libro:', error);
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
    console.error('Error deleting book', error)
  }
}


</script>

<style scoped>
/* Estilos específicos del componente BookList.vue */
</style>
