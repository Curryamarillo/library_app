<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 class="text-2xl mb-4">¿Te prestamos el libro?</h2>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" @click="save">Si</button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded" @click="close">No</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BookModal',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    emits: ['close', 'save'],
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$emit('save');
      }
    }
  });
  </script>
  
  <style scoped>

  </style>
  