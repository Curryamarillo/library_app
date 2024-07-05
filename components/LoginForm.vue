<template>
    <div class="flex items-center justify-center h-screen bg-green-900">
      <div class="bg-green-100 p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Inicio de Sesión</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium text-gray-700">Correo Electrónico:</label>
            <input type="email" id="email" v-model="email" required
              class="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
          </div>
          <div class="flex flex-col">
            <label for="password" class="text-sm font-medium text-gray-700">Contraseña:</label>
            <input type="password" id="password" v-model="password" required
              class="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
          </div>
          <button type="submit"
            class="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
    // Implement login logic here, e.g., using Nuxt Auth or making an API call
    console.log('Login attempted with:', email.value, password.value);
    // Replace with your actual login logic
  };
  </script>
  
  <style scoped>
  /* Use Tailwind classes instead of custom CSS */
  </style>
  