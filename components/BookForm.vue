<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-xl font-semibold mb-4">Agregar Libro</h1>
        <div v-if="isSaved"class="mb-4 text-green-500 font-bold">¡Libro guardado correctamente!</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título</label>
          <input id="title" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Título" v-model="title">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Autor</label>
          <input id="author" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Autor" v-model="author">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="isbn">ISBN</label>
          <input id="isbn" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="ISBN" v-model="isbn">
        </div>
        <div class="flex items-center justify-between">
          <button :disabled="isSaved" @click="save" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Guardar
          </button>
          <button @click="close" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Salir
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  const title = ref('');
  const author = ref('');
  const isbn = ref('');
  const isSaved = ref(false);

  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  });
  const emit = defineEmits(['close', 'save']);
  
  const close = () => emit('close');
  const save = () => {
    const newBook = {
        title: title.value,
        author: author.value,
        isbn: isbn.value
    }
    emit('save', newBook)
  }
  </script>
  
  <style scoped>
  </style>
  