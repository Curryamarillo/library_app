<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded shadow-lg w-1/2">
      <h2 class="text-2xl mb-4">¿Devuelves el libro "{{ bookName }}"?</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" @click="save">Si</button>
      <button class="bg-gray-500 text-white px-4 py-2 rounded" @click="close">No</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '~/types/IBooks';


const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  book: {
    type: Object as () => IBook | null,
    required: false
  },
  bookName: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['close', 'save']);

const close = () => emit('close');
const save = () => { 
  if(props.book) { 
    emit('save', props.book)
  }
}; 
</script>

<style scoped></style>