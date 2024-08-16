<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-xl font-semibold mb-4">Editar Libro</h1>
      <div v-if="book">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título: {{ book?.title }}</label>
          <input id="title" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Título" v-model="formData.title">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Autor: {{ book?.author }}</label>
          <input id="author" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Autor" v-model="formData.author">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="isbn">ISBN: {{ book?.isbn }}</label>
          <input id="isbn" type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ISBN" v-model="formData.isbn">
        </div>
        <div class="flex items-center justify-between">
          <button @click="saveChanges"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Guardar Cambios
          </button>
          <button @click="close"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type IBook } from '~/types/IBooks';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  book: {
    type: Object as () => IBook | null,
    required: false,
  },
});

const emit = defineEmits(['close', 'save']);

const formData = computed(() => ({
  title: props.book?.title || '',
  author: props.book?.author || '',
  isbn: props.book?.isbn || '',
}));

const saveChanges = () => {
  if (props.book) {
    emit('save', {
      ...props.book,
      title: formData.value.title,
      author: formData.value.author,
      isbn: formData.value.isbn,
    });
  }
};

const close = () => emit('close');
</script>

<style scoped>
/* Estilos específicos del componente BookEditForm.vue */
</style>
