<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div class="bg-red-500 p-4 rounded shadow-lg w-1/2">
      <h2 class="text-2xl text-white mb-4">¿Eliminamos "{{ book?.title }}" de la Base de Datos?</h2>
      <button class="bg-red-800 text-white px-4 py-2 rounded mr-2" @click="deleteBook">Si</button>
      <button class="bg-gray-900 text-white px-4 py-2 rounded" @click="closeDeleteBook">No</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IBook } from '~/types/IBooks';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  book: {
    type: Object as () => IBook | null,
    required: false
  }
});

const emit = defineEmits(['closeDeleteBook', 'deleteBook']);

const closeDeleteBook = () => emit('closeDeleteBook');
const deleteBook = () => {
  if(props.book) {
    emit('deleteBook', props.book)
  };
};
</script>

<style>

</style>